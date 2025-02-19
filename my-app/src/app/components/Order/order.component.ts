// components/order/order.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services';
import { Order } from '../../models/order/order.model';
import { NotificationService } from '../../services/notification/notification.service';
import { AuthService } from '../../services/auth/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="orders-container">
      <h2 class="text-2xl font-bold mb-6">Mes Commandes</h2>

      @if (isAdmin) {
        <div class="admin-controls mb-6">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            placeholder="Rechercher une commande..."
            class="search-input"
          >
          <select [(ngModel)]="filterStatus" class="status-filter">
            <option value="">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="processing">En cours</option>
            <option value="shipped">Expédiée</option>
            <option value="delivered">Livrée</option>
            <option value="cancelled">Annulée</option>
          </select>
        </div>
      }

      @if (orders.length === 0) {
        <div class="empty-state">
          <p>Aucune commande trouvée</p>
        </div>
      } @else {
        <div class="orders-list">
          @for (order of filteredOrders; track order.orderId) {
            <div class="order-card">
              <div class="order-header">
                <span class="order-id">Commande #{{ order.orderId }}</span>
                <span class="order-date">{{ order.orderDate | date:'dd/MM/yyyy HH:mm' }}</span>
                <span class="order-status" [class]="'status-' + order.status">
                  {{ order.status }}
                </span>
              </div>

              <div class="order-details">
                @for (detail of order.orderDetails; track detail.id_order_detail) {
                  <div class="order-item">
                    <span>{{ detail.product.name }}</span>
                    <span>{{ detail.quantity }}x</span>
                    <span>{{ detail.unit_price | currency:'EUR' }}</span>
                    <span>{{ detail.quantity * detail.unit_price | currency:'EUR' }}</span>
                  </div>
                }
              </div>

              <div class="order-footer">
                <div class="order-total">
                  Total: {{ calculateOrderTotal(order) | currency:'EUR' }}
                </div>

                @if (isAdmin) {
                  <div class="admin-actions">
                    <select
                      [(ngModel)]="order.status"
                      (change)="updateOrderStatus(order.orderId, order.status)"
                      class="status-select"
                    >
                      <option value="pending">En attente</option>
                      <option value="processing">En cours</option>
                      <option value="shipped">Expédiée</option>
                      <option value="delivered">Livrée</option>
                      <option value="cancelled">Annulée</option>
                    </select>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .orders-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .admin-controls {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;

      .search-input, .status-filter {
        padding: 0.5rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.375rem;
      }

      .search-input {
        flex: 1;
      }
    }

    .order-card {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      margin-bottom: 1rem;
      padding: 1rem;

      .order-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #e5e7eb;

        .order-id {
          font-weight: 600;
        }

        .order-status {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;

          &.status-pending { background: #fef3c7; }
          &.status-processing { background: #dbeafe; }
          &.status-shipped { background: #d1fae5; }
          &.status-delivered { background: #bbf7d0; }
          &.status-cancelled { background: #fee2e2; }
        }
      }

      .order-details {
        .order-item {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 1rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f3f4f6;
        }
      }

      .order-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        padding-top: 0.5rem;

        .order-total {
          font-weight: 600;
          font-size: 1.125rem;
        }

        .admin-actions {
          .status-select {
            padding: 0.375rem;
            border: 1px solid #e5e7eb;
            border-radius: 0.375rem;
          }
        }
      }
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      background: #f9fafb;
      border-radius: 0.5rem;
      color: #6b7280;
    }
  `]
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  isAdmin: boolean = false;
  searchTerm: string = '';
  filterStatus: string = '';

  constructor(
    private orderService: OrderService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (error) => {
        console.error('Erreur chargement commandes:', error);
        this.notificationService.error('Erreur lors du chargement des commandes');
      }
    });
  }

  get filteredOrders(): Order[] {
    return this.orders.filter(order => {
      const matchesSearch = !this.searchTerm ||
        order.id_order.toString().includes(this.searchTerm) ||
        order.orderDetails.some(detail =>
          detail.product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );

      const matchesStatus = !this.filterStatus || order.status === this.filterStatus;

      return matchesSearch && matchesStatus;
    });
  }

  calculateOrderTotal(order: Order): number {
    return order.orderDetails.reduce((total, detail) =>
      total + (detail.quantity * detail.unit_price), 0);
  }

  updateOrderStatus(orderId: number, newStatus: string): void {
    const updatedOrder = this.orders.find(o => o.id_order === orderId);
    if (!updatedOrder) return;

    this.orderService.updateOrder(orderId, {...updatedOrder, status: newStatus}).subscribe({
      next: () => {
        this.notificationService.success('Statut de la commande mis à jour');
        this.loadOrders();
      },
      error: (error) => {
        console.error('Erreur mise à jour statut:', error);
        this.notificationService.error('Erreur lors de la mise à jour du statut');
      }
    });
  }
}
