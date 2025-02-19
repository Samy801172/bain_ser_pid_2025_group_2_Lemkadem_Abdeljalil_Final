import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../../../services';
import {Order, OrderDetail} from '../../../../../models/order/order.model';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { PromotionService } from '../../../../../services/promotion/promotion.service';
import { Promotion } from '../../../../../models/promotion/promotion.model';

enum OrderStatus {
  Pending = 1,
  Processing = 2,
  Shipped = 3,
  Delivered = 4,
  Cancelled = 5
}

@Component({
  selector: 'app-admin-order-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Liste des commandes -->
    <div class="orders-container">
      <!-- En-tête avec statistiques -->
      <header class="page-header">
        <h1>Gestion des Commandes</h1>
        <div class="stats">
          <div class="stat-card">
            <span class="label">Total</span>
            <span class="value">{{orders.length}}</span>
          </div>
          <div class="stat-card">
            <span class="label">En cours</span>
            <span class="value">{{getOrdersByStatus(OrderStatus.Processing)}}</span>
          </div>
          <div class="stat-card">
            <span class="label">En attente</span>
            <span class="value">{{getOrdersByStatus(OrderStatus.Pending)}}</span>
          </div>
        </div>
      </header>
      <div class="filters">
        <input
          type="text"
          [(ngModel)]="searchTerm"
          (ngModelChange)="filterOrders()"
          placeholder="Rechercher une commande..."
          class="search-input"
        >
        <select
          [(ngModel)]="statusFilter"
          (change)="filterOrders()"
          class="status-select"
        >
          <option value="all">Tous les statuts</option>
          <option *ngFor="let status of orderStatuses" [value]="status.id_statut">
            {{status.label}}
          </option>
        </select>
      </div>
      <div *ngIf="loading" class="loading">Chargement des commandes...</div>

      <div *ngIf="error" class="error">{{ error }}</div>

      <div *ngIf="!loading && !error">
        <div *ngIf="filteredOrders.length === 0" class="empty-state">
          Aucune commande trouvée.
        </div>
        <div *ngIf="orders.length > 0" class="orders-grid">
          <div *ngFor="let order of filteredOrders; trackBy: trackByOrderId" class="order-card">
            <div class="order-header">
              <h3>Commande #{{ order.id_order }}</h3>
              <div class="order-info">
                <span class="order-date">{{ order.date_order | date:'dd/MM/yyyy' }}</span>
                <span [class]="getStatusClass(order.id_statut)">
                  {{ getStatusLabel(order.id_statut) }}
                </span>
              </div>
            </div>

            <div *ngIf="order.orderDetails && order.orderDetails.length > 0" class="order-products">
              <div *ngFor="let detail of order.orderDetails; trackBy: trackByOrderDetailId" class="product-item">
                <span class="product-name">{{ detail.product.name }}</span>
                <span class="product-quantity">x{{ detail.quantity }}</span>
                <span class="product-price">{{ detail.unit_price | currency:'EUR' }}</span>
              </div>
            </div>

            <div class="order-footer">
              <div class="order-totals">
                <span class="order-total">Total: {{ order.montant_total | currency:'EUR' }}</span>
              </div>
              <button class="details-btn" (click)="openOrderDetails(order)">
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-overlay" *ngIf="selectedOrder">
      <div class="modal-content">
        <!-- En-tête -->
        <div class="modal-header">
          <div class="header-content">
            <h3>Détails de la commande #{{selectedOrder.id_order}}</h3>
            <div class="status-badge" [class]="getStatusClass(selectedOrder.id_statut)">
              {{ getStatusLabel(selectedOrder.id_statut) }}
            </div>
          </div>
          <button class="close-btn" (click)="closeModal()">×</button>
        </div>

        <!-- Corps -->
        <div class="modal-body">
          <!-- Informations client -->
          <div class="card info-section">
            <h4>Informations client</h4>
            <div class="client-info">
              <div class="info-row">
                <span class="label">Client:</span>
                <span class="value">{{ selectedOrder.client?.firstName }} {{ selectedOrder.client?.lastName }}</span>
              </div>
              <div class="info-row">
                <span class="label">Date:</span>
                <span class="value">{{ selectedOrder.date_order | date:'dd/MM/yyyy HH:mm' }}</span>
              </div>
            </div>
          </div>

          <!-- Produits -->
          <div class="card product-section">
            <h4>Produits commandés</h4>
            <div class="table-responsive">
              <table>
                <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Prix unitaire</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let detail of selectedOrder.orderDetails; trackBy: trackByOrderDetailId">
                  <td>{{ detail.product.name }}</td>
                  <td>
                    <div class="quantity-control">
                      <button class="qty-btn" (click)="updateQuantity(detail, -1)" [disabled]="detail.quantity <= 1">-</button>
                      <input
                        type="number"
                        [(ngModel)]="detail.quantity"
                        min="1"
                        (change)="validateAndUpdateQuantity(detail)"
                        class="qty-input"
                      >
                      <button class="qty-btn" (click)="updateQuantity(detail, 1)">+</button>
                    </div>
                  </td>
                  <td>{{ detail.unit_price | currency:'EUR' }}</td>
                  <td>{{ detail.quantity * detail.unit_price | currency:'EUR' }}</td>
                  <td>
                    <button class="delete-btn" (click)="removeProduct(detail)">
                      Supprimer
                    </button>
                  </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                  <td colspan="3" class="total-label">Total</td>
                  <td colspan="2" class="total-value">{{ selectedOrder.montant_total | currency:'EUR' }}</td>
                </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <!-- Gestion du statut -->
          <div class="card status-section">
            <h4>Gestion du statut</h4>
            <div class="status-control">
              <select
                [(ngModel)]="newStatus"
                [disabled]="processing"
                class="status-select"
              >
                <option [ngValue]="null">Sélectionner un nouveau statut</option>
                <option
                  *ngFor="let status of getAvailableStatuses(selectedOrder)"
                  [ngValue]="status.id_statut"
                >
                  {{ status.label }}
                </option>
              </select>
              <button
                class="action-btn primary"
                [disabled]="!newStatus || processing || newStatus === selectedOrder.id_statut"
                (click)="updateOrderStatus()"
              >
                {{ processing ? 'Mise à jour...' : 'Mettre à jour le statut' }}
              </button>
            </div>
            <div *ngIf="statusError" class="error-message">{{ statusError }}</div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button class="action-btn secondary" (click)="closeModal()">
            Annuler
          </button>
          <button
            class="action-btn primary"
            [disabled]="processing || !hasChanges()"
            (click)="saveChanges()"
          >
            {{ processing ? 'Enregistrement...' : 'Sauvegarder' }}
          </button>
        </div>
      </div>
    </div>

  `,
  styles: [`

    .details-btn {
      background: #2563eb;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.375rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #1d4ed8;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    // Pour le montant total
    .order-total {
      font-weight: 600;
      color: #1a56db;
      font-size: 1.125rem;
      padding: 0.5rem;
      background: #f3f4f6;
      border-radius: 0.375rem;
    }

    // Pour le bouton de mise à jour du statut
    .update-status-btn {
      background: #3b82f6;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.375rem;
      font-weight: 500;
      transition: all 0.2s;

      &:hover {
        background: #2563eb;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    // Pour les boutons d'action en bas de la modal
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      padding: 1rem;
      border-top: 1px solid #e5e7eb;
      background: #f9fafb;

      button {
        padding: 0.5rem 1.5rem;
        border-radius: 0.375rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;

        &.cancel {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;

          &:hover {
            background: #e5e7eb;
          }
        }

        &.save {
          background: #2563eb;
          color: white;
          border: none;

          &:hover {
            background: #1d4ed8;
          }
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }

    // Pour le select de statut
    .status-select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background-color: white;
      font-size: 0.875rem;
      color: #374151;
      cursor: pointer;
      transition: all 0.2s;

      &:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
      }

      &:disabled {
        background-color: #f3f4f6;
        cursor: not-allowed;
      }
    }
    .orders-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      background: #f8f9fa;
    }
    .stats-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      padding: 1.5rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: flex-end;
      gap: 2rem;

      .stat-item {
        text-align: center;

        .value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2563eb;

          &.processing { color: #0369a1; }
          &.pending { color: #92400e; }
        }

        .label {
          font-size: 0.875rem;
          color: #6b7280;
        }
      }
    }
    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);

      .search-input {
        flex: 1;
        padding: 0.625rem 1rem;
        border: 1px solid #E5E7EB;
        border-radius: 6px;
        min-width: 250px;

        &:focus {
          outline: none;
          border-color: #0066CC;
        }
      }
      .stats {
        display: flex;
        gap: 1.5rem;

        .stat-card {
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          min-width: 120px;
          text-align: center;

          .value {
            color: #0066CC;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0.25rem;
          }

          .label {
            color: #6B7280;
            font-size: 0.875rem;
          }
        }
      }

      .status-select {
        padding: 0.625rem 1rem;
        border: 1px solid #E5E7EB;
        border-radius: 6px;
        min-width: 200px;
        background: white;
        cursor: pointer;

        &:focus {
          outline: none;
          border-color: #0066CC;
        }
      }
    }
    .page-header {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        color: #0066CC;
        font-size: 1.5rem;
        margin: 0;
        font-weight: 500;
      }
    }

    .stats {
      display: flex;
      gap: 1.5rem;

      .stat-card {
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        min-width: 120px;
        text-align: center;

        .value {
          color: #0066CC;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.25rem;
        }

        .label {
          color: #6B7280;
          font-size: 0.875rem;
        }
      }
    }

    .orders-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .order-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      overflow: hidden;

      .order-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.25rem;
        background: #f8f9fa;
        border-bottom: 1px solid #e5e7eb;

        h3 {
          margin: 0;
          color: #111827;
          font-size: 1rem;
          font-weight: 500;
        }

        .status {
          padding: 0.375rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;

          &.status-1 { background: #FEF3C7; color: #92400E; }  // En attente
          &.status-2 { background: #DBEAFE; color: #1E40AF; }  // En cours
          &.status-3 { background: #D1FAE5; color: #065F46; }  // Expédié
          &.status-4 { background: #BBF7D0; color: #166534; }  // Livré
          &.status-5 { background: #FEE2E2; color: #991B1B; }  // Annulé
        }
      }

      .order-details {
        padding: 1.25rem;

        table {
          width: 100%;
          border-collapse: collapse;

          th {
            text-align: left;
            padding: 0.75rem;
            background: #f8f9fa;
            border-bottom: 1px solid #e5e7eb;
            font-weight: 500;
            color: #374151;
          }

          td {
            padding: 0.75rem;
            border-bottom: 1px solid #e5e7eb;
          }
        }
      }

      .product-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        border-bottom: 1px solid #e5e7eb;

        &:last-child {
          border-bottom: none;
        }
      }
    }

    .action-buttons {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;

      button {
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        border: none;
        transition: all 0.2s;

        &.update-btn {
          background: #0066CC;
          color: white;
          &:hover { background: #0052a3; }
        }

        &.cancel-btn {
          background: #DC2626;
          color: white;
          &:hover { background: #B91C1C; }
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }

    .quantity-control {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      input {
        width: 60px;
        text-align: center;
        padding: 0.25rem;
        border: 1px solid #D1D5DB;
        border-radius: 4px;
      }

      button {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: #F3F4F6;
        cursor: pointer;
        border-radius: 4px;

        &:hover {
          background: #E5E7EB;
        }
      }
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: grid;
      place-items: center;
      z-index: 50;
    }

    .modal-content {
      background: white;
      border-radius: 8px;
      width: 90%;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: grid;
      place-items: center;
      z-index: 50;
      padding: 1rem;
    }

    .modal-content {
      background: white;
      border-radius: 0.75rem;
      width: 100%;
      max-width: 900px;
      max-height: calc(100vh - 2rem);
      overflow-y: auto;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .modal-header {
      padding: 1.25rem;
      border-bottom: 1px solid #e5e7eb;
      background: #f8fafc;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .header-content {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      h3 {
        margin: 0;
        font-size: 1.25rem;
        color: #0f172a;
      }

      .close-btn {
        background: transparent;
        border: none;
        font-size: 1.5rem;
        color: #64748b;
        cursor: pointer;
        padding: 0.25rem;
        line-height: 1;

        &:hover {
          color: #0f172a;
        }
      }
    }

    .card {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      padding: 1.25rem;
      margin-bottom: 1rem;

      h4 {
        margin: 0 0 1rem 0;
        font-size: 1rem;
        color: #0f172a;
      }
    }

    .info-section {
      .client-info {
        display: grid;
        gap: 0.75rem;
      }

      .info-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .label {
          color: #64748b;
          min-width: 80px;
        }

        .value {
          color: #0f172a;
          font-weight: 500;
        }
      }
    }

    .table-responsive {
      overflow-x: auto;
      margin: 0 -1.25rem;
      padding: 0 1.25rem;

      table {
        width: 100%;
        border-collapse: collapse;
        white-space: nowrap;

        th {
          background: #f8fafc;
          padding: 0.75rem 1rem;
          text-align: left;
          color: #64748b;
          font-weight: 500;
          border-bottom: 1px solid #e2e8f0;
        }

        td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: middle;
        }

        tfoot {
          font-weight: 600;

          .total-label {
            text-align: right;
            color: #64748b;
          }

          .total-value {
            color: #0f172a;
          }
        }
      }
    }

    .quantity-control {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;

      .qty-input {
        width: 60px;
        text-align: center;
        padding: 0.375rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.375rem;

        &:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }
      }

      .qty-btn {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #e2e8f0;
        background: white;
        border-radius: 0.375rem;
        cursor: pointer;
        color: #64748b;
        padding: 0;

        &:hover:not(:disabled) {
          background: #f8fafc;
          color: #0f172a;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }

    .status-section {
      .status-control {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .status-select {
        flex: 1;
        padding: 0.5rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.375rem;
        background: white;

        &:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        &:disabled {
          background: #f8fafc;
          cursor: not-allowed;
        }
      }
    }

    .action-btn {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &.primary {
        background: #3b82f6;
        color: white;
        border: none;

        &:hover:not(:disabled) {
          background: #2563eb;
        }
      }

      &.secondary {
        background: white;
        color: #64748b;
        border: 1px solid #e2e8f0;

        &:hover:not(:disabled) {
          background: #f8fafc;
          color: #0f172a;
        }
      }
    }

    .delete-btn {
      padding: 0.375rem 0.75rem;
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;

      &:hover {
        background: #dc2626;
      }
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;

      &.status-1 { background: #fef3c7; color: #92400e; }
      &.status-2 { background: #dbeafe; color: #1e40af; }
      &.status-3 { background: #d1fae5; color: #065f46; }
      &.status-4 { background: #bbf7d0; color: #166534; }
      &.status-5 { background: #fee2e2; color: #991b1b; }
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .modal-footer {
      padding: 1.25rem;
      border-top: 1px solid #e2e8f0;
      background: #f8fafc;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;}
  `]
})
export class AdminOrdersComponent implements OnInit {
  // Propriétés existantes
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedOrder: Order | null = null;
  newStatus: number | null = null;
  statusError: string | null = null;
  loading = false;
  error: string | null = null;
  processing = false;
  searchTerm: string = '';
  statusFilter: string = 'all';
  OrderStatus = OrderStatus; // Pour l'utiliser dans le template

  // Nouvelles propriétés pour les promotions
  availablePromotions: Promotion[] = [];
  selectedPromotion: Promotion | null = null;
  tempSelectedPromotion: Promotion | null = null; // Ajout de cette propriété
  originalTotal = 0; // Ajout de cette propriété

  @Output() orderUpdated = new EventEmitter<void>();

  // Statuts possibles
  orderStatuses = [
    {id_statut: OrderStatus.Pending, label: 'En attente'},
    {id_statut: OrderStatus.Processing, label: 'En cours de traitement'},
    {id_statut: OrderStatus.Shipped, label: 'Expédié'},
    {id_statut: OrderStatus.Delivered, label: 'Livré'},
    {id_statut: OrderStatus.Cancelled, label: 'Annulé'}
  ];

  private readonly validTransitions = {
    [OrderStatus.Pending]: [OrderStatus.Processing, OrderStatus.Cancelled],
    [OrderStatus.Processing]: [OrderStatus.Shipped, OrderStatus.Cancelled],
    [OrderStatus.Shipped]: [OrderStatus.Delivered, OrderStatus.Cancelled],
    [OrderStatus.Delivered]: [] as OrderStatus[],
    [OrderStatus.Cancelled]: [] as OrderStatus[]
  };

  constructor(
    private orderService: OrderService,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit() {
    this.loadOrders();

  }


  calculateDiscount(): number {
    if (!this.selectedPromotion || !this.selectedOrder) return 0;
    return (this.selectedOrder.montant_total * this.selectedPromotion.discountPercentage) / 100;
  }


  openModal(order: Order): void {
    this.selectedOrder = {...order};
    this.selectedPromotion = null;
  }



  cancelOrder(): void {
    if (!this.selectedOrder || !confirm('Êtes-vous sûr de vouloir annuler cette commande ?')) {
      return;
    }

    this.processing = true;
    this.orderService.updateOrderStatus(this.selectedOrder.id_order, 5).subscribe({
      next: () => {
        this.notificationService.success('Commande annulée avec succès');
        this.closeModal();
        this.loadOrders();
      },
      error: (error) => {
        console.error('Erreur annulation commande:', error);
        this.notificationService.error('Erreur lors de l\'annulation de la commande');
      },
      complete: () => {
        this.processing = false;
      }
    });
  }

// Ajoutez ces nouvelles méthodes


  removePromotion(): void {
    if (!this.selectedOrder) return;

    this.selectedOrder.montant_total = this.originalTotal;
    this.selectedPromotion = null;
    this.tempSelectedPromotion = null;
  }


  updateTotal(): void {
    if (!this.selectedOrder) return;

    this.originalTotal = this.selectedOrder.orderDetails.reduce(
      (total, detail) => total + (detail.quantity > 0 ? detail.quantity * detail.unit_price : 0),
      0
    );

    if (this.selectedPromotion) {
      const discountAmount = this.calculateDiscount();
      this.selectedOrder.montant_total = this.originalTotal - discountAmount;
    } else {
      this.selectedOrder.montant_total = this.originalTotal;
    }
  }


  saveChanges(): void {
    if (!this.selectedOrder) return;

    console.log('Selected Order:', this.selectedOrder);
    // Vérifiez que `id_client` est bien défini ici.

    this.processing = true;
    const updates = {
      orderDetails: this.selectedOrder.orderDetails,
      id_statut: this.selectedOrder.id_statut,
      promotionId: this.selectedPromotion?.id_promotion
    };

    this.orderService.updateOrder(this.selectedOrder.id_order, updates).subscribe({
      next: () => {
        this.notificationService.success('Commande mise à jour avec succès');
        this.closeModal();
        this.loadOrders();
      },
      error: (error) => {
        console.error('Erreur mise à jour commande:', error);
        this.notificationService.error('Erreur lors de la mise à jour de la commande');
      },
      complete: () => {
        this.processing = false;
      }
    });
  }

  getStatusClass(statusId: number): string {
    return `status status-${statusId}`;
  }

  getStatusLabel(statusId: number): string {
    const status = this.orderStatuses.find(s => s.id_statut === statusId);
    return status ? status.label : 'Inconnu';
  }

  loadOrders(): void {
    this.loading = true;
    this.error = null;
    this.orders = [];
    this.filteredOrders = []; // Ajout de cette ligne

    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        if (!orders) {
          this.error = 'Aucune commande trouvée';
          return;
        }
        this.orders = orders;
        this.filteredOrders = [...orders]; // Ajout de cette ligne
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur chargement commandes:', error);
        this.error = 'Impossible de charger les commandes.';
        this.loading = false;
      }
    });
  }

  closeStatusModal(): void {
    this.selectedOrder = null;
    this.selectedPromotion = null; // Réinitialiser la promotion sélectionnée
    this.newStatus = null;
    this.statusError = null;
    this.processing = false;
  }

  getAvailableStatuses(order: Order | null): { id_statut: number; label: string }[] {
    if (!order) return [];

    const currentStatus = order.id_statut as OrderStatus;
    const availableTransitions = this.validTransitions[currentStatus] || [];

    return this.orderStatuses.filter(status =>
      availableTransitions.includes(status.id_statut as OrderStatus)
    );
  }

  updateOrderStatus(): void {
    if (!this.selectedOrder || !this.newStatus) {
      this.statusError = 'Veuillez sélectionner un nouveau statut.';
      return;
    }

    if (this.newStatus === this.selectedOrder.id_statut) {
      this.statusError = 'Le nouveau statut doit être différent de l\'ancien.';
      return;
    }

    if (!this.isValidTransition(this.selectedOrder.id_statut, this.newStatus)) {
      this.statusError = 'Cette transition de statut n\'est pas autorisée.';
      return;
    }

    this.processing = true;
    this.statusError = null;

    this.orderService.updateOrderStatus(this.selectedOrder.id_order, this.newStatus)
      .subscribe({
        next: () => {
          this.notificationService.success('Statut mis à jour avec succès');
          this.loadOrders();
          this.closeStatusModal();
          this.orderUpdated.emit();
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du statut:', error);
          this.statusError = 'Erreur lors de la mise à jour du statut.';
          this.processing = false;
        }
      });
  }

  private isValidTransition(currentStatus: number, newStatus: number): boolean {
    if (currentStatus === newStatus) return false;

    const currentStatusEnum = currentStatus as OrderStatus;
    const validTransitions = this.validTransitions[currentStatusEnum];

    if (!validTransitions) return false;

    return validTransitions.includes(newStatus as OrderStatus);
  }

  applySelectedPromotion(): void {
    if (!this.tempSelectedPromotion || !this.selectedOrder) return;

    if (this.selectedPromotion) {
      this.removePromotion();
    }

    this.selectedPromotion = this.tempSelectedPromotion;
    const discountAmount = this.calculateDiscount();
    this.selectedOrder.montant_total = this.originalTotal - discountAmount;
    this.tempSelectedPromotion = null;
  }

  // Méthodes trackBy pour améliorer les performances
  trackByOrderId(index: number, order: Order): number {
    return order.id_order;
  }

  trackByOrderDetailId(index: number, detail: any): number {
    return detail.id_order_detail;
  }

  trackByPromotionId(index: number, promotion: Promotion): number {
    return promotion.id_promotion;  // Changé de 'id' à 'id_promotion'
  }

  trackByStatusId(index: number, status: { id_statut: number }): number {
    return status.id_statut;
  }

  removeProduct(detail: OrderDetail): void {
    if (!this.selectedOrder || !detail) {
      this.notificationService.error('Impossible de supprimer le produit : informations manquantes');
      return;
    }

    const detailId = detail.id_order_detail;
    if (!detailId) {
      this.notificationService.error('Impossible de supprimer le produit : identifiant manquant');
      return;
    }

    console.log('Suppression du produit avec id_order_detail:', detailId);

    this.processing = true;
    this.orderService.deleteOrderDetail(detailId).subscribe({
      next: () => {
        if (this.selectedOrder) {
          this.selectedOrder.orderDetails = this.selectedOrder.orderDetails.filter(
            d => d.id_order_detail !== detailId
          );
          this.updateTotal();
        }
        this.notificationService.success('Produit supprimé avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du produit:', error);
        this.notificationService.error('Erreur lors de la suppression du produit');
      },
      complete: () => {
        this.processing = false;
      }
    });
  }

  filterOrders(): void {
    this.filteredOrders = this.orders.filter(order => {
      // Filtre par texte
      const matchesSearch = !this.searchTerm ||
        order.id_order.toString().includes(this.searchTerm) ||
        order.client?.firstName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.client?.lastName?.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filtre par statut
      const matchesStatus = this.statusFilter === 'all' ||
        order.id_statut.toString() === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }


  // Gestion des statuts
  getOrdersByStatus(status: OrderStatus): number {
    return this.orders.filter(order => order.id_statut === status).length;
  }

  validateAndUpdateQuantity(detail: OrderDetail): void {
    if (detail.quantity < 1) {
      detail.quantity = 1;
    }
    this.updateTotal();
  }

  updateQuantity(detail: OrderDetail, change: number): void {
    const newQty = detail.quantity + change;
    if (newQty >= 1) {
      detail.quantity = newQty;
      this.updateTotal();
    }
  }
  hasChanges(): boolean {
    if (!this.selectedOrder || !this.originalOrder) {
      return false;
    }

    const quantityChanged: boolean = this.selectedOrder.orderDetails.some(detail => {
      const original = this.originalOrder!.orderDetails.find(
        d => d.id_order_detail === detail.id_order_detail
      );
      return original ? original.quantity !== detail.quantity : false;
    });

    const statusChanged: boolean = Boolean(
      this.newStatus && this.newStatus !== this.originalOrder.id_statut
    );

    return quantityChanged || statusChanged;
  }

  closeModal(): void {
    if (this.hasChanges() && !confirm('Des modifications non sauvegardées seront perdues. Voulez-vous continuer ?')) {
      return;
    }
    this.closeStatusModal();
  }
  originalOrder: Order | null = null;

  openOrderDetails(order: Order): void {
    this.selectedOrder = {...order};
    this.originalOrder = {...order};
    this.newStatus = null;
    this.statusError = null;
  }
  }
