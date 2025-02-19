// src/app/components/order-confirmation/order-confirmation.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../services';
import { NotificationService } from '../../services/notification/notification.service';
import { Order } from '../../models/order/order.model';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="confirmation-container">
      <div class="success-message">
        <h2>Commande confirmée!</h2>
        <p>Votre commande #{{orderId}} a été validée avec succès</p>
      </div>

      @if (order) {
        <div class="order-details">
          <h3>Récapitulatif de votre commande</h3>
          <div class="items-list">
            @for (detail of order.orderDetails; track detail.id_order_detail) {
              <div class="order-item">
                <span class="product-name">{{detail.product.name}}</span>
                <span class="quantity">x{{detail.quantity}}</span>
                <span class="price">{{detail.unit_price | currency:'EUR'}}</span>
              </div>
            }
          </div>

          <div class="total">
            <strong>Total:</strong>
            <span>{{order.montant_total | currency:'EUR'}}</span>
          </div>
        </div>

        <div class="actions">
          <button routerLink="/client/products" class="continue-shopping">
            Continuer mes achats
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .confirmation-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
    }

    .success-message {
      text-align: center;
      margin-bottom: 2rem;
      padding: 2rem;
      background: #d4edda;
      border-radius: 8px;
      color: #155724;
    }

    .order-details {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .items-list {
      margin: 1.5rem 0;
    }

    .order-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #eee;
    }

    .total {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 2px solid #eee;
      text-align: right;
      font-size: 1.2rem;
    }

    .actions {
      margin-top: 2rem;
      text-align: center;
    }

    .continue-shopping {
      padding: 0.75rem 1.5rem;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: #4338ca;
      }
    }
  `]
})
export class OrderConfirmationComponent implements OnInit {
  orderId: string | null = null;
  order: Order | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private notificationService: NotificationService

  ) {}


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id');
      if (this.orderId) {
        // Convertir orderId en nombre
        const orderIdNumber = parseInt(this.orderId, 10);
        if (!isNaN(orderIdNumber)) {
          this.loadOrderDetails(orderIdNumber);
        } else {
          this.notificationService.error('ID de commande invalide');
        }
      }
    });
  }

  private loadOrderDetails(orderId: number) { // Changé le type en number
    this.orderService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.order = order;
      },
      error: (error) => {
        console.error('Erreur chargement commande:', error);
        this.notificationService.error('Erreur lors du chargement des détails de la commande');
      }
    });
  }
}
