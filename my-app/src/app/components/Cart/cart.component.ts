import { Component, OnInit } from '@angular/core'; // Importation des modules Angular nécessaires
import { CommonModule } from '@angular/common'; // Importation du module commun d'Angular
import { CartService } from '../../services'; // Importation du service CartService
import { CartItem } from '../../models/cart/cart-item.model'; // Importation du modèle CartItem
import { NotificationService } from '../../services/notification/notification.service'; // Importation du service NotificationService
import { Router } from '@angular/router'; // Importation du module de routage Angular
import { PromotionService } from '../../services/promotion/promotion.service'; // Importation du service PromotionService

@Component({
  selector: 'app-cart', // Définition du sélecteur du composant
  standalone: true, // Indique que le composant est autonome
  imports: [CommonModule], // Importation des modules nécessaires
  templateUrl: './cart.component.html', // Lien vers le fichier HTML du composant
  styleUrls: ['./cart.component.scss'] // Lien vers le fichier SCSS du composant
})
export class CartComponent implements OnInit {
  items: CartItem[] = []; // Déclaration d'un tableau pour stocker les articles du panier
  total: number = 0; // Initialisation du total du panier à 0

  constructor(
    private cartService: CartService, // Injection du service CartService
    private promotionService: PromotionService, // Injection du service PromotionService
    private notificationService: NotificationService, // Injection du service NotificationService
    private router: Router // Injection du service Router
  ) {}

  ngOnInit(): void {
    this.loadCart(); // Appel de la méthode pour charger les articles du panier au démarrage
  }

  loadCart(): void {
    this.cartService.getCartItems().subscribe({
      next: (items: CartItem[]) => {
        this.items = items; // Stocke les articles récupérés
        this.calculateTotal(); // Met à jour le total du panier
      },
      error: () => {
        this.notificationService.error('Erreur lors du chargement du panier'); // Affiche une erreur en cas d'échec
      }
    });
  }

  hasActivePromotion(item: CartItem): boolean {
    return !!item.product.promotion && this.isPromotionActive(item.product.promotion); // Vérifie si l'article a une promotion active
  }

  incrementQuantity(item: CartItem): void {
    const newQuantity = item.quantity + 1; // Incrémente la quantité de l'article

    if (newQuantity > item.product.stock) { // Vérifie si la nouvelle quantité dépasse le stock
      this.notificationService.error('Stock maximum atteint');
      return;
    }

    this.updateCartItemQuantity(item, newQuantity); // Met à jour la quantité de l'article
  }

  decrementQuantity(item: CartItem): void {
    const newQuantity = item.quantity - 1; // Décrémente la quantité de l'article

    if (newQuantity < 1) { // Vérifie si la quantité est inférieure à 1
      this.notificationService.error('Quantité minimum atteinte');
      return;
    }

    this.updateCartItemQuantity(item, newQuantity); // Met à jour la quantité de l'article
  }

  updateCartItemQuantity(item: CartItem, newQuantity: number): void {
    this.cartService.updateQuantity(item.id, newQuantity).subscribe({
      next: () => {
        item.quantity = newQuantity; // Met à jour la quantité dans l'interface
        this.calculateTotal(); // Recalcule le total du panier
      },
      error: () => {
        this.notificationService.error('Erreur lors de la mise à jour de la quantité'); // Affiche une erreur en cas d'échec
      }
    });
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id).subscribe({
      next: () => {
        this.items = this.items.filter(i => i.id !== item.id); // Supprime l'article de la liste
        this.calculateTotal(); // Met à jour le total du panier
      },
      error: () => {
        this.notificationService.error('Erreur lors de la suppression du produit'); // Affiche une erreur en cas d'échec
      }
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.items = []; // Vide la liste des articles
        this.total = 0; // Réinitialise le total à 0
        this.notificationService.success('Panier vidé'); // Affiche un message de succès
      },
      error: () => {
        this.notificationService.error('Erreur lors du vidage du panier'); // Affiche une erreur en cas d'échec
      }
    });
  }

  proceedToCheckout(): void {
    if (this.items.length === 0) { // Vérifie si le panier est vide
      this.notificationService.error('Votre panier est vide');
      return;
    }

    this.router.navigate(['/client/checkout']).then(
      () => this.notificationService.success('Redirection vers le checkout'), // Redirige vers la page de checkout
      () => this.notificationService.error('Erreur lors de l\'accès au checkout') // Affiche une erreur en cas d'échec
    );
  }

  getItemPrice(item: CartItem): number {
    if (this.hasActivePromotion(item)) { // Vérifie si l'article a une promotion active
      return item.product.price * (1 - (item.product.promotion?.discountPercentage || 0) / 100); // Calcule le prix avec la réduction
    }
    return item.product.price; // Retourne le prix normal si pas de promotion
  }

  getSubTotal(item: CartItem): number {
    return this.getItemPrice(item) * item.quantity; // Calcule le sous-total d'un article
  }

  calculateTotal(): void {
    this.total = this.items.reduce((sum, item) => sum + this.getSubTotal(item), 0); // Calcule le total du panier
  }

  getDiscountedPrice(product: any): number {
    if (!product.activePromotion || !this.isPromotionActive(product.activePromotion)) { // Vérifie si la promotion est active
      return product.price;
    }

    const discount = product.activePromotion.discountPercentage; // Récupère le pourcentage de réduction
    const discountedPrice = product.price * (1 - discount / 100); // Applique la réduction
    return Number(discountedPrice.toFixed(2)); // Retourne le prix arrondi à 2 décimales
  }

  isPromotionActive(promotion: any): boolean {
    if (!promotion) return false; // Vérifie si la promotion est définie
    const now = new Date(); // Récupère la date actuelle
    const startDate = new Date(promotion.startDate); // Convertit la date de début
    const endDate = new Date(promotion.endDate); // Convertit la date de fin
    return now >= startDate && now <= endDate; // Vérifie si la promotion est active
  }
}
