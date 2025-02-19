// Importation des modules nécessaires d'Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Importation des services personnalisés
import { ManufacturingService } from '../../../services/manufacturing/manufacturing.service';
import { PaymentService } from '../../../services/payment/payment.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { OrderService } from '../../../services/order/order.service';

// Importation des modèles et composants
import { Manufacturing } from '../../../models/manufacturing/manufacturing.model';
import { ManufacturingStatus } from '../../../models/manufacturing/manufacturing.model';
import { PaypalButtonComponent } from '../../PayPal/paypal-button.component';

// Déclaration du composant Angular
@Component({
  selector: 'app-manufacturing-payment', // Sélecteur du composant
  standalone: true, // Indique que ce composant est autonome
  imports: [CommonModule, PaypalButtonComponent], // Importation des modules nécessaires
  template: `
    <div class="payment-container">
      <h2>Paiement de l'Acompte</h2>

      <div class="order-details">
        <h3>Détails de la Commande #{{orderId}}</h3>
        @if (orderDetails) { // Vérifie si les détails de la commande sont disponibles
          <div class="details">
            <div class="detail-line">
              <span>Type:</span>
              <span>{{orderDetails.type}}</span>
            </div>
            <div class="detail-line">
              <span>Prix Total:</span>
              <span>{{orderDetails.totalPrice | currency:'EUR'}}</span>
            </div>
            <div class="detail-line total">
              <strong>Acompte (30%):</strong>
              <strong>{{orderDetails.deposit | currency:'EUR'}}</strong>
            </div>
          </div>

          <div class="payment-methods">
            <h3>Paiement Sécurisé</h3>

            <div class="paypal-container">
              <app-paypal-button
                [amount]="orderDetails.deposit || 0"
                [isDeposit]="true"
                [manufacturingRequestId]="orderId"
              ></app-paypal-button>
            </div>

            <button class="btn card" (click)="payByCard()">
              <i class="fas fa-credit-card"></i> Payer par Carte
            </button>
          </div>
        } @else { // Si les détails de la commande ne sont pas encore chargés
          <div class="loading">
            Chargement des détails...
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .payment-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .detail-line {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #eee;
    }
    .total {
      margin-top: 1rem;
      border-top: 2px solid #ddd;
      border-bottom: none;
      font-size: 1.2em;
    }
    .payment-methods {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
    .paypal-container {
      width: 100%;
      max-width: 300px;
      margin: 1rem 0;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      width: 100%;
      max-width: 300px;
    }
    .card {
      background: #2c3e50;
      color: white;
    }
    .loading {
      text-align: center;
      padding: 2rem;
      color: #666;
    }
  `]
})
export class ManufacturingPaymentComponent implements OnInit {
  orderId: number; // ID de la commande
  orderDetails: Manufacturing | null = null; // Détails de la commande

  constructor(
    private route: ActivatedRoute, // Pour accéder aux paramètres de route
    private router: Router, // Pour la navigation
    private manufacturingService: ManufacturingService, // Service pour les opérations de fabrication
    private notificationService: NotificationService, // Service pour les notifications
    private orderService: OrderService // Service pour les opérations de commande
  ) {
    this.orderId = 0; // Initialisation de l'ID de la commande
  }

  ngOnInit() {
    console.log('Component initialized'); // Log pour indiquer que le composant est initialisé
    this.orderId = parseInt(this.route.snapshot.params['id']); // Récupération de l'ID de la commande depuis les paramètres de route
    this.loadOrderDetails(); // Chargement des détails de la commande
  }

  async loadOrderDetails() {
    try {
      console.log('Loading order details for ID:', this.orderId); // Log pour indiquer le chargement des détails de la commande
      const response = await this.manufacturingService.getManufacturingDetails(this.orderId).toPromise(); // Appel au service pour obtenir les détails de la commande
      if (response) {
        this.orderDetails = response; // Mise à jour des détails de la commande
        console.log('Order details loaded:', this.orderDetails); // Log pour indiquer que les détails de la commande ont été chargés
      }
    } catch (error) {
      console.error('Error loading details:', error); // Log en cas d'erreur
      this.notificationService.error('Erreur lors du chargement des détails'); // Notification d'erreur
    }
  }

  handlePaymentSuccess(paymentInfo: any) {
    const clientId = localStorage.getItem('clientId'); // Récupération de l'ID du client depuis le localStorage
    if (!clientId) {
      this.notificationService.error('Session expirée'); // Notification d'erreur si la session est expirée
      this.router.navigate(['/login']); // Redirection vers la page de connexion
      return;
    }

    const orderData = {
      clientId: Number(clientId), // ID du client
      orderLines: [{
        productId: this.orderDetails?.id || 0, // ID du produit
        quantity: 1 // Quantité
      }],
      payment: {
        method: 'PAYPAL', // Méthode de paiement
        transactionId: paymentInfo.orderId || paymentInfo.id, // ID de la transaction
        status: 'COMPLETED', // Statut du paiement
        amount: this.orderDetails?.deposit || 0 // Montant de l'acompte
      }
    };

    this.orderService.createManufacturingOrder(orderData).subscribe({
      next: (response) => {
        this.notificationService.success('Acompte payé avec succès !'); // Notification de succès
        this.router.navigate(['/manufacturing-confirmation', response.id_order]); // Redirection vers la page de confirmation
      },
      error: (error) => {
        console.error('Erreur paiement acompte:', error); // Log en cas d'erreur
        this.notificationService.error('Erreur lors du paiement de l\'acompte'); // Notification d'erreur
      }
    });
  }

  payByCard() {
    this.notificationService.info('Paiement par carte bientôt disponible'); // Notification d'information
  }
}
