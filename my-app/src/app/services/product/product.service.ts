import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product, ProductWithPromotion } from '../../models/product/product.model';
import { NotificationService } from '../notification/notification.service';
import { environment } from '../../../environments/environment';

// Interface représentant un élément du panier
export interface CartItem {
  productId: number; // Identifiant du produit
  quantity: number;  // Quantité ajoutée au panier
  product?: Product; // Détails du produit (facultatif)
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = `${environment.apiUrl}${environment.endpoints.products}`; // URL de base pour les requêtes produits
  private cartItems = new BehaviorSubject<CartItem[]>([]); // Gestion réactive des éléments du panier

  constructor(
    private http: HttpClient, // Service HTTP pour les appels API
    private notificationService: NotificationService // Service de notifications
  ) {}

  // Méthode pour créer un nouveau produit
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API_URL, product).pipe(
      catchError(error => {
        this.notificationService.error('Erreur lors de la création du produit'); // Notification en cas d'erreur
        return throwError(() => error); // Retourne une erreur observable
      })
    );
  }

  // Met à jour un produit existant en envoyant uniquement les champs nécessaires
  updateProduct(id: number, updateData: Partial<Product>): Observable<Product> {
    console.log(`Updating product ${id} with data:`, updateData);
    return this.http.put<Product>(`${this.API_URL}/${id}`, updateData).pipe(
      tap(response => console.log('Update response:', response)), // Log de la réponse en cas de succès
      catchError(error => {
        console.error('Error in updateProduct:', error);
        return throwError(() => error); // Gestion d'erreur
      })
    );
  }

  // Supprime un produit par son ID
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        this.notificationService.error('Erreur lors de la suppression du produit'); // Notification d'erreur
        return throwError(() => error);
      })
    );
  }

  // Ajoute un produit au panier
  addToCart(product: Product, quantity: number): Observable<void> {
    const cartItem: CartItem = {
      productId: product.id_product, // ID du produit
      product: product,             // Détails du produit
      quantity: quantity            // Quantité ajoutée
    };

    const currentCart = this.cartItems.value; // Récupération du panier actuel
    const existingItem = currentCart.find(item => item.productId === product.id_product);

    if (existingItem) {
      existingItem.quantity += quantity; // Augmente la quantité si le produit est déjà dans le panier
    } else {
      currentCart.push(cartItem); // Ajoute un nouvel élément sinon
    }

    this.cartItems.next([...currentCart]); // Mise à jour réactive du panier
    this.saveCartToLocalStorage();        // Sauvegarde dans le localStorage

    return new Observable<void>(observer => {
      observer.next();   // Notification de succès
      observer.complete();
    });
  }

  // Sauvegarde le panier dans le localStorage du navigateur
  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }

  // Ajoute un produit via une API (route spécifique `/add`)
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.API_URL}/add`, product);
  }

  // Supprime une promotion associée à un produit
  removePromotion(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${productId}/promotions`).pipe(
      catchError(error => {
        console.error('Erreur suppression promotion:', error);
        throw error; // Relance l'erreur pour gestion ultérieure
      })
    );
  }

  // Applique une promotion à un produit donné
  applyPromotion(productId: number, promotionId: number): Observable<any> {
    return this.http.post(`${this.API_URL}/${productId}/apply-promotion`, { promotionId }).pipe(
      tap(() => console.log('Promotion appliquée avec succès')), // Log en cas de succès
      catchError(error => {
        console.error('Erreur lors de l\'application de la promotion:', error);
        this.notificationService.error('Erreur lors de l\'application de la promotion');
        return throwError(() => error); // Gestion d'erreur
      })
    );
  }

  // Récupère un produit par son ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`).pipe(
      map(product => ({
        ...product,
        imageUrls: product.imageUrls || [] // Garantit un tableau pour les images, même si vide
      })),
      catchError(error => {
        this.notificationService.error('Erreur lors du chargement du produit'); // Notification d'erreur
        return throwError(() => error);
      })
    );
  }

  // Récupère tous les produits en incluant les promotions actives
  getAllProducts(): Observable<ProductWithPromotion[]> {
    return this.http.get<any[]>(this.API_URL).pipe(
      tap(products => console.log('Products from API:', products)), // Log des produits reçus
      map(products => products.map(product => this.mapProductWithPromotion(product))), // Mapping des produits avec promotions
      tap(mappedProducts => console.log('Products with promotions:', mappedProducts))
    );
  }

  // Met à jour le stock d'un produit
  updateStock(productId: number, newStock: number) {
    return this.http.patch(`${this.API_URL}/products/${productId}/stock`, { stock: newStock });
  }

  // Vérifie si une promotion est active
  private isPromotionActive(promotion: any): boolean {
    if (!promotion) return false; // Pas de promotion
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    return now >= startDate && now <= endDate; // Vérifie les dates
  }

  // Mappe un produit pour inclure les informations de promotion
  private mapProductWithPromotion(product: any): ProductWithPromotion {
    const now = new Date();

    if (product.promotion) {
      const startDate = new Date(product.promotion.startDate);
      const endDate = new Date(product.promotion.endDate);

      if (now >= startDate && now <= endDate) {
        const discountedPrice = product.price * (1 - product.promotion.discountPercentage / 100);
        return {
          ...product,
          activePromotion: {
            id_promotion: product.promotion.id_promotion,
            description: product.promotion.description,
            discountPercentage: product.promotion.discountPercentage,
            startDate: product.promotion.startDate,
            endDate: product.promotion.endDate
          },
          promotionPrice: Number(discountedPrice.toFixed(2)) // Prix réduit
        };
      }
    }

    // Retourne le produit sans promotion active
    return {
      ...product,
      activePromotion: null,
      promotionPrice: product.price
    };
  }
}
