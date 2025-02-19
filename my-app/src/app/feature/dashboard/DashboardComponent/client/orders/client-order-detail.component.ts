// Composant pour afficher les détails d'une commande client
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { OrderService } from '../../../../../services';
import { Order } from '../../../../../models/order/order.model';
import { ClientDashboardComponent } from '../client-dashboard.component';
import { ClientOrdersComponent } from './client-orders.component';
import { AuthGuard } from '../../../guard/auth.guard';

@Component({
  selector: 'app-client-order-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Conteneur principal des détails de commande -->
    <div class="order-detail-container">
      <!-- Affichage du loader pendant le chargement -->
      @if (loading) {
        <div class="loading">Chargement des détails...</div>
      }

      <!-- Affichage des erreurs -->
      @if (error) {
        <div class="error">{{ error }}</div>
      }

      <!-- Affichage des détails de la commande -->
      @if (!loading && order) {
        <div class="order-detail-card">
          <!-- En-tête de la commande -->
          <div class="order-header">
            <div class="order-info">
              <h2>Commande #{{ order.id_order }}</h2>
              <span class="order-date">{{ order.date_order | date:'dd/MM/yyyy' }}</span>
            </div>
            <span class="status" [class]="getStatusClass(order.id_statut)">
              {{ getStatusLabel(order.id_statut) }}
            </span>
          </div>

          <!-- Liste des produits commandés -->
          <div class="products-list">
            <h3>Produits commandés</h3>
            @for (detail of order.orderDetails; track detail.id_order_detail) {
              <div class="product-item">
                <div class="product-info">
                  <h4>{{ detail.product.name }}</h4>
                </div>
                <div class="product-details">
                  <div class="quantity">
                    Quantité: {{ detail.quantity }}
                  </div>
                  <div class="price-details">
                    <span class="unit-price">{{ detail.unit_price | currency:'EUR' }} / unité</span>
                    <span class="line-total">{{ detail.quantity * detail.unit_price | currency:'EUR' }}</span>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Résumé de la commande -->
          <div class="order-summary">
            <div class="total-section">
              <span>Total de la commande:</span>
              <span class="total-amount">{{ order.montant_total | currency:'EUR' }}</span>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="actions">
            <button class="back-btn" (click)="goBack()">Retour aux commandes</button>
          </div>
        </div>
      }
    </div>
  `,
  // Styles du composant
  styles: [/* ... styles existants ... */]
})
export class ClientOrderDetailComponent implements OnInit {
  // Propriétés du composant
  order: Order | null = null; // Stocke les détails de la commande
  loading = false; // Indicateur de chargement
  error: string | null = null; // Message d'erreur éventuel

  constructor(
    private route: ActivatedRoute, // Pour accéder aux paramètres de route
    private router: Router, // Pour la navigation
    private orderService: OrderService // Service de gestion des commandes
  ) {}

  // Initialisation du composant
  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.loadOrderDetails(+orderId);
    }
  }

  // Charge les détails d'une commande
  loadOrderDetails(orderId: number) {
    this.loading = true;
    this.orderService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.loading = false;
      },
      error: () => {
        this.error = "Impossible de charger les détails de la commande";
        this.loading = false;
      }
    });
  }

  // Retourne la classe CSS pour le statut
  getStatusClass(status: number): string {
    return `status status-${status}`;
  }

  // Retourne le libellé du statut
  getStatusLabel(status: number): string {
    const statusMap: { [key: number]: string } = {
      1: 'En attente',
      2: 'En cours de traitement',
      3: 'Expédié',
      4: 'Livré',
      5: 'Annulé'
    };
    return statusMap[status] || 'Statut inconnu';
  }

  // Navigation retour vers la liste des commandes
  goBack() {
    this.router.navigate(['/client/orders']);
  }
}

// Configuration des routes client
export const clientRoutes: Routes = [
  {
    path: '',
    component: ClientDashboardComponent,
    children: [
      {
        path: 'orders',
        component: ClientOrdersComponent,
        canActivate: [AuthGuard], // Protection de la route
        data: {
          title: 'Mes Commandes',
          requiresAuth: true
        }
      },
      {
        path: 'orders/:id',
        component: ClientOrderDetailComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Détail de la commande',
          requiresAuth: true
        }
      }
    ]
  }
];