import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Cart } from '../../models/cart/cart.model';
import { CartItem } from '../../models/cart/cart-item.model';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:2024/api/cart';  // URL de l'API pour interagir avec le panier
  private cartSubject: BehaviorSubject<Cart>;  // Sujet observé pour gérer l'état du panier

  constructor(
    private http: HttpClient,  // Service pour effectuer des requêtes HTTP
    private notificationService: NotificationService  // Service pour afficher des notifications
  ) {
    // Initialisation du sujet avec un panier vide
    this.cartSubject = new BehaviorSubject<Cart>({ items: [], total: 0 });
    this.loadCart();  // Charge le panier à partir du serveur lors de l'initialisation
  }

  // Méthode pour obtenir les articles du panier
  getCartItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable().pipe(
      map(cart => cart.items)  // Transforme l'objet panier pour ne retourner que les articles
    );
  }

  // Méthode pour ajouter un produit au panier
  addToCart(productId: number, quantity: number = 1): Observable<Cart> {
    const clientId = localStorage.getItem('clientId');  // Récupère l'ID du client depuis le localStorage
    if (!clientId) {
      this.notificationService.error('Session expirée. Veuillez vous reconnecter.');
      return throwError(() => new Error('Client ID non trouvé'));
    }

    // Prépare le corps de la requête avec l'ID du client, le produit et la quantité
    const payload = {
      clientId: parseInt(clientId),
      productId,
      quantity
    };

    console.log('Envoi requête addToCart avec payload:', payload);

    // Envoie la requête POST pour ajouter l'article au panier
    return this.http.post<CartItem>(`${this.apiUrl}`, payload, {
      headers: this.getAuthHeaders()  // Ajoute les en-têtes d'authentification
    }).pipe(
      map(newItem => {
        console.log('Réponse addToCart du serveur:', newItem);
        const currentCart = this.cartSubject.value;  // Récupère l'état actuel du panier
        const existingItemIndex = currentCart.items.findIndex(i => i.productId === productId);  // Vérifie si l'article existe déjà

        let updatedItems;
        if (existingItemIndex >= 0) {
          // Si l'article existe déjà, met à jour la quantité
          updatedItems = currentCart.items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + quantity }  // Incrémente la quantité
              : item
          );
        } else {
          // Si l'article n'existe pas, l'ajoute au panier
          updatedItems = [...currentCart.items, newItem];
        }

        // Calcule le nouveau total du panier
        const updatedCart = {
          items: updatedItems,
          total: this.calculateTotal(updatedItems)
        };

        console.log('Cart mis à jour:', updatedCart);
        this.cartSubject.next(updatedCart);  // Met à jour l'état du panier
        return updatedCart;
      }),
      tap(() => {
        this.notificationService.success("Produit ajouté au panier");
        this.loadCart();  // Recharge le panier pour avoir les données à jour
      }),
      catchError(error => {
        console.error('Erreur addToCart:', error);
        this.notificationService.error(
          error.error?.message || "Erreur lors de l'ajout au panier"
        );
        return throwError(() => error);  // Gère l'erreur et la renvoie
      })
    );
  }

  // Méthode pour calculer le total du panier, en tenant compte des promotions
  private calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => {
      let price = item.product.price;

      // Applique la promotion si elle existe
      if (item.product.activePromotion) {
        const discountAmount = price * (item.product.activePromotion.discountPercentage / 100);
        price = price - discountAmount;
      }

      // Ajoute le prix de l'article au total
      return total + (price * item.quantity);
    }, 0);
  }

  // Méthode pour retirer un produit du panier
  removeFromCart(cartId: number): Observable<Cart> {
    return this.http.delete<CartItem[]>(`${this.apiUrl}/${cartId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(items => {
        const currentCart = this.cartSubject.value;
        // Filtre les articles pour exclure celui qui a été retiré
        const updatedItems = currentCart.items.filter(item => item.id !== cartId);
        const updatedCart = { items: updatedItems, total: this.calculateTotal(updatedItems) };
        this.cartSubject.next(updatedCart);  // Met à jour le panier
        return updatedCart;
      }),
      tap(() => this.notificationService.success("Produit retiré du panier")),
      catchError(error => {
        this.notificationService.error(error.error?.message || "Erreur lors de la suppression du produit");
        return throwError(() => error);  // Gère l'erreur et la renvoie
      })
    );
  }

  // Méthode pour mettre à jour la quantité d'un produit dans le panier
  updateQuantity(cartItemId: number, quantity: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(
      `${this.apiUrl}/${cartItemId}/quantity`,
      { quantity },
      { headers }
    ).pipe(
      tap(() => {
        console.log(`Quantité mise à jour - ID: ${cartItemId}, Nouvelle quantité: ${quantity}`);
      }),
      catchError(error => {
        console.error('Erreur mise à jour quantité:', error);
        return throwError(() => error);  // Gère l'erreur et la renvoie
      })
    );
  }

  // Méthode pour charger les données du panier depuis l'API
  private loadCart(): void {
    this.http.get<CartItem[]>(`${this.apiUrl}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(items => ({
        items,
        total: this.calculateTotal(items)  // Calcule le total du panier
      })),
      catchError(error => {
        this.notificationService.error("Erreur lors du chargement du panier");
        return throwError(() => error);  // Gère l'erreur et la renvoie
      })
    ).subscribe(cart => {
      this.cartSubject.next(cart);  // Met à jour le panier avec les données récupérées
    });
  }

  // Méthode pour obtenir les en-têtes d'authentification
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Méthode pour vider le panier
  clearCart(): Observable<void> {
    const clientId = localStorage.getItem('clientId');
    if (!clientId) {
      return throwError(() => new Error('Client ID non trouvé'));
    }

    return this.http.delete<void>(`${this.apiUrl}/clear/${clientId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(() => {
        // Réinitialisation du panier local après la suppression
        this.cartSubject.next({ items: [], total: 0 });
        this.notificationService.success('Panier vidé avec succès');
      }),
      catchError(error => {
        console.error('Erreur lors du vidage du panier:', error);
        this.notificationService.error('Erreur lors du vidage du panier');
        return throwError(() => error);  // Gère l'erreur et la renvoie
      })
    );
  }
}
