// services/checkout/checkout.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { CartService } from '../cart/cart.service';
import { OrderService } from '../order/order.service';
import { NotificationService } from '../notification/notification.service';
import { NewOrder } from '../../models/order/order.model';
import { CartItem } from '../../models/cart/cart-item.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = `${environment.apiUrl}/checkout`; // URL de base pour l'API checkout

  constructor(
    private http: HttpClient,
    private cartService: CartService, // Service pour accéder au panier
    private orderService: OrderService, // Service pour gérer les commandes
    private notificationService: NotificationService, // Service pour afficher les notifications
    private router: Router // Service de navigation pour rediriger l'utilisateur
  ) {}

  // Crée une commande à partir des éléments du panier
  createOrderFromCart(): Observable<any> {
    return this.cartService.getCartItems().pipe(
      switchMap(cartItems => {
        // Vérifie si le panier est vide
        if (!cartItems.length) {
          return throwError(() => new Error('Le panier est vide')); // Lance une erreur si le panier est vide
        }

        // Prépare les données de la commande à envoyer à l'API
        const orderData: NewOrder = {
          clientId: this.getCurrentClientId(), // Récupère l'ID du client actuel
          orderLines: cartItems.map(item => ({
            id_product: item.product.id_product,
            quantity: item.quantity,
            unit_price: this.getPrice(item) // Calcule le prix unitaire de l'article
          }))
        };

        // Crée la commande en appelant le service OrderService
        return this.orderService.createOrder(orderData);
      }),
      tap(() => {
        // Vider le panier après la création de la commande
        this.cartService.clearCart().subscribe();
      }),
      catchError(error => {
        // Affiche une notification d'erreur si la commande échoue
        this.notificationService.error('Erreur lors de la création de la commande');
        return throwError(() => error);
      })
    );
  }

  // Traite le paiement en envoyant les données de paiement à l'API
  processPayment(paymentData: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.getAuthToken()}`); // Ajoute le token d'autorisation

    return this.http.post(`${this.apiUrl}/process-payment`, paymentData, { headers }).pipe(
      catchError(error => {
        // Vérifie si l'erreur est une expiration de session et redirige l'utilisateur vers la page de connexion
        if (error.status === 401) {
          this.notificationService.error('Session expirée');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  // Récupère le token d'authentification depuis le localStorage
  private getAuthToken(): string {
    return localStorage.getItem('token') || ''; // Retourne le token ou une chaîne vide si absent
  }

  // Confirme la commande après le paiement
  confirmOrder(orderId: number, paymentInfo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm-order/${orderId}`, paymentInfo).pipe(
      tap(() => {
        this.notificationService.success('Commande confirmée avec succès'); // Affiche une notification de succès
      }),
      catchError(error => {
        this.notificationService.error('Erreur lors de la confirmation de la commande');
        return throwError(() => error);
      })
    );
  }

  // Récupère l'ID du client actuel depuis le localStorage
  private getCurrentClientId(): number {
    const clientId = localStorage.getItem('clientId');
    if (!clientId) {
      throw new Error('Client ID non trouvé'); // Lance une erreur si l'ID du client est introuvable
    }
    return parseInt(clientId, 10); // Retourne l'ID du client sous forme d'entier
  }

  // Calcule le prix d'un article en tenant compte des promotions
  private getPrice(item: any): number {
    // Si un produit a une promotion active, applique le rabais
    if (item.product.activePromotion) {
      const discount = item.product.activePromotion.discountPercentage;
      return item.product.price * (1 - discount / 100); // Calcule le prix après réduction
    }
    return typeof item.product.price === 'string' ?
      parseFloat(item.product.price) : // Si le prix est une chaîne, on le convertit en nombre
      item.product.price; // Sinon on retourne le prix tel quel
  }

  // Valide une commande en envoyant une requête à l'API
  validateOrder(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/validate/${orderId}`, {}).pipe(
      tap(() => {
        this.notificationService.success('Commande validée avec succès');
      }),
      catchError(error => {
        this.notificationService.error('Erreur lors de la validation de la commande');
        return throwError(() => error);
      })
    );
  }

  // Calcule le total de la commande en additionnant le prix de chaque article
  calculateOrderTotal(items: any[]): number {
    return items.reduce((total, item) => {
      return total + (this.getPrice(item) * item.quantity); // Ajoute le prix total de chaque article
    }, 0);
  }

  // Traite le paiement via Bancontact
  processBancontactPayment(orderData: any) {
    return this.http.post<any>(`${this.apiUrl}/payment/bancontact`, orderData);
  }

  // Traite le paiement via carte bancaire
  processCardPayment(orderData: any) {
    return this.http.post<any>(`${this.apiUrl}/payment/card`, orderData);
  }

  // Crée une commande en envoyant les éléments du panier
  createOrder(cartItems: CartItem[]): Observable<any> {
    const clientId = localStorage.getItem('clientId');
    
    if (!clientId) {
      return throwError(() => new Error('Client non authentifié')); // Retourne une erreur si le client n'est pas authentifié
    }

    const orderData: NewOrder = {
      clientId: Number(clientId), // Récupère l'ID du client
      orderLines: cartItems.map(item => ({
        id_product: item.product.id_product,
        quantity: item.quantity,
        unit_price: item.product.activePromotion 
          ? this.calculateDiscountedPrice(item) // Applique la réduction si nécessaire
          : Number(item.product.price)
      }))
    };

    return this.http.post(`${this.apiUrl}/orders`, orderData); // Envoie la commande à l'API
  }

  // Calcule le prix avec réduction pour un article si une promotion est active
  private calculateDiscountedPrice(item: CartItem): number {
    if (item.product.activePromotion) {
      const discount = item.product.activePromotion.discountPercentage;
      return Number(item.product.price) * (1 - discount / 100); // Applique le rabais
    }
    return Number(item.product.price); // Retourne le prix sans réduction si aucune promotion
  }
}
