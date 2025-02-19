import { Component, OnInit } from '@angular/core'; // Importation des modules Angular nécessaires
import { CommonModule } from '@angular/common'; // Importation du module commun d'Angular
import { Router } from '@angular/router'; // Importation du module de routage Angular
import { CartService } from '../../services/cart/cart.service'; // Importation du service CartService
import { NotificationService } from '../../services/notification/notification.service'; // Importation du service NotificationService
import { PaypalButtonComponent } from '../PayPal/paypal-button.component'; // Importation du composant PayPal
import { CartItem } from '../../models/cart/cart-item.model'; // Importation du modèle CartItem

@Component({
  selector: 'app-checkout', // Définition du sélecteur du composant
  standalone: true, // Indique que le composant est autonome
  imports: [CommonModule, PaypalButtonComponent], // Importation des modules nécessaires
  templateUrl: './checkout.component.html', // Lien vers le fichier HTML du composant
  styleUrls: ['./checkout.component.scss'] // Lien vers le fichier SCSS du composant
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = []; // Déclaration d'un tableau pour stocker les articles du panier
  total: number = 0; // Initialisation du total du panier à 0
  amount: number = 0; // Initialisation du montant à payer
  isProcessing = false; // Indicateur de traitement du paiement

  constructor(
    private cartService: CartService, // Injection du service CartService
    private router: Router, // Injection du service Router
    private notificationService: NotificationService // Injection du service NotificationService
  ) {}

  ngOnInit() {
    this.loadCart(); // Chargement du panier lors de l'initialisation du composant
  }

  loadCart() {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items; // Stocke les articles récupérés
        this.total = this.calculateTotal(items); // Calcule le total du panier
        this.amount = this.total; // Définit le montant à payer
      },
      error: (error) => {
        console.error('Erreur chargement panier:', error);
        this.notificationService.error('Erreur lors du chargement du panier'); // Affiche une erreur en cas d'échec
      }
    });
  }

  calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => 
      sum + (this.hasActivePromotion(item) 
        ? this.calculateDiscountedPrice(item) 
        : Number(item.product.price)) * item.quantity, 
      0
    ); // Calcule le total du panier en appliquant les promotions actives
  }

  hasActivePromotion(item: CartItem): boolean {
    if (!item.product.activePromotion) {
      return false; // Vérifie si une promotion est active sur le produit
    }
    
    const endDate = item.product.activePromotion.endDate;
    if (!endDate) {
      return false; // Vérifie si une date de fin de promotion est définie
    }

    return new Date(endDate) > new Date(); // Vérifie si la promotion est encore valide
  }

  calculateDiscountedPrice(item: CartItem): number {
    const activePromotion = item.product.activePromotion;
    if (!activePromotion || !this.hasActivePromotion(item)) {
      return Number(item.product.price); // Retourne le prix normal si pas de promotion
    }
    
    const discountPercentage = activePromotion.discountPercentage ?? 0;
    const discount = discountPercentage / 100;
    return Number(item.product.price) * (1 - discount); // Applique la réduction sur le prix
  }

  returnToCart(): void {
    this.router.navigate(['/client/cart']); // Redirection vers la page du panier
  }

  handlePaymentSuccess(event: any): void {
    console.log('Paiement réussi:', event);
    this.notificationService.success('Paiement effectué avec succès'); // Notification de succès après paiement
  }

  payWithBancontact(): void {
    this.isProcessing = true;
    this.notificationService.info('Paiement Bancontact bientôt disponible'); // Indication que le paiement Bancontact est en cours de développement
  }

  payWithCard(): void {
    this.isProcessing = true;
    this.notificationService.info('Paiement par carte bientôt disponible'); // Indication que le paiement par carte est en cours de développement
  }
}
