import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification/notification.service';
import { PaymentService } from '../../services/payment/payment.service';
import { environment } from '../../../environments/environment';
import { NgZone } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { switchMap } from 'rxjs/operators';

// Déclare l'objet global `window` pour inclure PayPal
declare global {
  interface Window {
    paypal?: any;
  }
}

@Component({
  selector: 'app-paypal-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="paypal-button-container">
      <div id="paypal-button"></div>
    </div>
  `,
  styles: [`
    .paypal-button-container {
      margin: 20px 0;
      text-align: center;
    }
  `]
})
export class PaypalButtonComponent implements OnInit {
  // Montant du paiement (requis)
  @Input() amount!: number;
  // Indique si le paiement concerne un acompte
  @Input() isDeposit: boolean = false;
  // Identifiant d'une demande de fabrication (optionnel)
  @Input() manufacturingRequestId?: number;
  // Événement émis lors d'un paiement réussi
  @Output() paymentSuccess = new EventEmitter<any>();
  // Tableau pour stocker les articles du panier
  cartItems: any[] = [];

  constructor(
    private paymentService: PaymentService, // Service de gestion des paiements
    private cartService: CartService, // Service de gestion du panier
    private router: Router, // Service de navigation
    private notificationService: NotificationService, // Service de notifications utilisateur
    private ngZone: NgZone // Gestion du cycle de vie Angular dans des processus asynchrones
  ) {
    this.loadCartItems(); // Charge les articles du panier dès l'initialisation du composant
  }

  ngOnInit() {
    // Vérifie si un montant a été fourni
    if (!this.amount) {
      console.error('Amount is required'); // Affiche une erreur si le montant est manquant
      return;
    }
    this.initPayPalButton(); // Initialise le bouton PayPal
  }

  // Récupère les articles du panier depuis le service CartService
  private loadCartItems() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  // Initialise le bouton PayPal et configure ses fonctionnalités
  private initPayPalButton() {
    // Vérifie si le script PayPal est bien chargé
    if (!window.paypal) {
      console.error('PayPal script not loaded'); // Affiche une erreur si PayPal n'est pas chargé
      return;
    }

    // Configuration des boutons PayPal
    window.paypal.Buttons({
      // Création de la commande PayPal
      createOrder: async (data: any, actions: any) => {
        try {
          console.log('Creating PayPal order with:', {
            amount: this.amount,
            isDeposit: this.isDeposit,
            manufacturingRequestId: this.manufacturingRequestId
          });

          // Envoie la requête de création de commande au service PaymentService
          const response = await this.paymentService.createPayPalOrder(
            this.amount,
            this.isDeposit,
            this.manufacturingRequestId
          ).toPromise();
          
          console.log('PayPal order created:', response);
          return response.paypalOrderId; // Retourne l'ID de la commande PayPal
        } catch (error) {
          console.error('Erreur création commande:', error);
          this.notificationService.error('Erreur lors de la création de la commande');
          throw error; // Lève une erreur si la création échoue
        }
      },

      // Validation du paiement après approbation
      onApprove: async (data: any) => {
        try {
          console.log('Capturing PayPal order:', {
            orderId: data.orderID,
            manufacturingId: this.manufacturingRequestId
          });

          // Capture le paiement en appelant le service PaymentService
          const result = await this.paymentService.capturePayPalOrder(
            data.orderID,
            this.manufacturingRequestId || 0
          ).toPromise();

          console.log('PayPal capture result:', result);

          // Utilisation de NgZone pour mettre à jour l'interface utilisateur après une opération asynchrone
          this.ngZone.run(() => {
            this.notificationService.success('Paiement effectué avec succès');
            
            // Redirection en fonction du type de paiement
            if (this.isDeposit && this.manufacturingRequestId) {
              this.router.navigate(['/manufacturing/confirmation', this.manufacturingRequestId]);
            } else {
              this.router.navigate(['/payment-success']);
            }
            this.paymentSuccess.emit(result); // Émet un événement de succès
          });
        } catch (error) {
          console.error('Erreur capture PayPal:', error);
          this.notificationService.error('Erreur lors de la finalisation du paiement');
        }
      },

      // Gestion des erreurs de paiement
      onError: (err: any) => {
        console.error('PayPal Error:', err);
        this.ngZone.run(() => {
          this.notificationService.error('Erreur lors du paiement');
        });
      }
    }).render('#paypal-button'); // Rendu du bouton PayPal dans l'élément HTML ciblé
  }
}
