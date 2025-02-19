// Importation des modules nécessaires pour le composant
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OrderService } from '../../../../../services';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Order, OrderDetail } from '../../../../../models/order/order.model';
import { AuthService } from '../../../../../services/auth/auth.service';
import { PromotionService } from '../../../../../services/promotion/promotion.service';
import { ProductWithPromotion } from '../../../../../models/product/product.model';

// Déclaration du composant Angular
@Component({
  selector: 'app-client-orders',
  standalone: true,
  imports: [CommonModule, RouterModule], // Importation des modules nécessaires pour le template
  template: `
    <div class="orders-container">
      <h2>Mes Commandes</h2>

      <!-- Affichage de l'état de chargement si 'loading' est vrai -->
      @if (loading) {
        <div class="loading">Chargement des commandes...</div>
      }

      <!-- Affichage d'une erreur si 'error' contient une valeur -->
      @if (error) {
        <div class="error">{{ error }}</div>
      }

      <!-- Affichage des commandes si aucune erreur et le chargement est terminé -->
      @if (!loading && !error) {
        @if (orders.length === 0) {
          <div class="empty-state">
            Vous n'avez pas encore de commande
          </div>
        } @else {
          <!-- Affichage de la liste des commandes -->
          <div class="orders-list">
            @for (order of orders; track order.id_order) {
              <div class="order-card">
                <div class="order-header">
                  <span class="order-number">Commande #{{ order.id_order }}</span>
                  <div class="order-info">
                    <span class="order-date">{{ order.date_order | date:'dd/MM/yyyy' }}</span>
                    <span class="status" [class]="getStatusClass(order.id_statut)">
                      {{ getStatusLabel(order.id_statut) }}
                    </span>
                  </div>
                </div>

                <!-- Détails des produits de la commande -->
                @if (order.orderDetails && order.orderDetails.length > 0) {
                  <div class="order-products">
                    @for (detail of order.orderDetails; track detail.id_order_detail) {
                      <div class="product-item">
                        <span class="product-name">{{ detail.product.name }}</span>
                        <span class="product-quantity">x{{ detail.quantity }}</span>
                        <div class="price-info">
                          <span class="original-price">{{ detail.product.price | currency:'EUR' }}</span>
                          <span class="final-price">{{ detail.unit_price | currency:'EUR' }}</span>
                        </div>
                      </div>
                    }
                  </div>
                }

                <!-- Footer de la commande -->
                <div class="order-footer">
                  <div class="order-totals">
                    <span class="order-total">
                      Total: {{ order.montant_total | currency:'EUR' }}
                    </span>
                  </div>
                  <button class="details-btn" (click)="viewOrderDetails(order.id_order)">
                    Voir le détail
                  </button>
                </div>
              </div>
            }
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .orders-container {
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .order-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 20px;
      padding: 20px;
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }

    .status {
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 0.9em;
    }

    .order-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
    }

    .order-total {
      font-weight: bold;
      font-size: 1.1em;
    }

    .details-btn {
      background: #4f46e5;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .details-btn:hover {
      background: #4338ca;
    }

    .status-1 { background: #fff3cd; color: #856404; }
    .status-2 { background: #cce5ff; color: #004085; }
    .status-3 { background: #d4edda; color: #155724; }
    .status-4 { background: #d4edda; color: #155724; }
    .status-5 { background: #f8d7da; color: #721c24; }
    .status-unknown { background: #e9ecef; color: #495057; }

    .empty-state {
      text-align: center;
      padding: 40px;
      background: #f9fafb;
      border-radius: 8px;
      color: #6b7280;
    }
  `]
})
export class ClientOrdersComponent implements OnInit {
  orders: Order[] = []; // Liste des commandes
  loading = false; // Indicateur de chargement
  error: string | null = null; // Message d'erreur

  constructor(
    private orderService: OrderService,
    private notificationService: NotificationService,
    private router: Router,
    private promotionService: PromotionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrders(); // Chargement des commandes à l'initialisation
  }

  // Fonction pour charger les commandes du client
  loadOrders(): void {
    this.loading = true;
    this.error = null;

    const clientId = this.getCurrentClientId(); // Récupère l'ID du client courant
    if (!clientId) {
      this.error = "Impossible de récupérer l'ID client";
      this.loading = false;
      return;
    }

    // Appel du service pour récupérer les commandes
    this.orderService.getOrdersByClientId(clientId).subscribe({
      next: (orders: Order[]) => {
        console.log('Orders received:', orders);
        // Pour chaque commande, afficher les détails des prix
        orders.forEach(order => {
          console.log(`Order #${order.id_order}:`);
          order.orderDetails?.forEach(detail => {
            console.log(`  Product: ${detail.product.name}`);
            console.log(`  Unit price saved: ${detail.unit_price}`);
            console.log(`  Original price: ${detail.product.price}`);
          });
        });
        this.orders = this.sortOrdersByDate(orders); // Trier les commandes par date
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur:', error);
        this.error = "Erreur lors du chargement des commandes";
        this.loading = false;
      }
    });
  }

  // Fonction pour trier les commandes par date (les plus récentes en premier)
  private sortOrdersByDate(orders: Order[]): Order[] {
    return orders.sort((a, b) =>
      new Date(b.date_order).getTime() - new Date(a.date_order).getTime()
    );
  }

  // Fonction pour récupérer l'ID du client courant depuis le localStorage
  private getCurrentClientId(): number | null {
    const clientIdStr = localStorage.getItem('clientId');
    if (!clientIdStr) {
      this.notificationService.error('Session expirée');
      this.router.navigate(['/login']);
      return null;
    }
    const clientId = parseInt(clientIdStr, 10);
    return isNaN(clientId) ? null : clientId;
  }

  // Fonction pour obtenir l'étiquette du statut de la commande
  getStatusLabel(statusId: number): string {
    const statusMap: { [key: number]: string } = {
      1: 'En attente',
      2: 'En cours de traitement',
      3: 'Expédié',
      4: 'Livré',
      5: 'Annulé'
    };
    return statusMap[statusId] || 'Statut inconnu';
  }

  // Fonction pour obtenir la classe CSS associée au statut de la commande
  getStatusClass(statusId: number): string {
    return `status status-${statusId}`;
  }

  // Fonction pour naviguer vers les détails d'une commande
  viewOrderDetails(orderId: number): void {
    this.router.navigate(['/client/orders', orderId]);
  }

  // Fonction pour vérifier si le prix unitaire a changé par rapport au prix original
  hasPriceChanged(detail: OrderDetail): boolean {
    return detail.unit_price !== detail.product.price;
  }
}
