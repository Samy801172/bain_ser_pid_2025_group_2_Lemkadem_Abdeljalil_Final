// Importation des modules et services nécessaires depuis Angular et les services personnalisés
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManufacturingService } from '../../../services/manufacturing/manufacturing.service';
import { Manufacturing } from '../../../models/manufacturing/manufacturing.model';
import { ManufacturingNotificationService } from '../../../services/manufacturing/manufacturing-notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from '../../../services/notification.service';

// Déclaration du composant Angular avec le sélecteur 'app-manufacturing-list'
@Component({
  selector: 'app-manufacturing-list', // Le sélecteur utilisé pour intégrer ce composant dans d'autres templates
  standalone: true, // Indique que ce composant est autonome et ne nécessite pas de module NgModule
  imports: [CommonModule, RouterModule], // Importation de CommonModule et RouterModule pour utiliser les directives communes et la navigation
  template: `
    <div class="manufacturing-list">
      <h2>Mes Fabrications</h2> <!-- Titre de la page -->
      
      @if (loading) {
        <div class="loading">Chargement...</div> <!-- Affichage d'un message de chargement -->
      }

      @if (!loading && manufacturingItems.length === 0) {
        <div class="empty-state">
          <p>Aucune fabrication en cours</p> <!-- Message si aucune fabrication n'est en cours -->
        </div>
      }

      @if (!loading && manufacturingItems.length > 0) {
        <div class="items-grid">
          @for (item of manufacturingItems; track item.id) {
            <div class="fabrication-item">
              <div class="header">
                <div class="title">Fabrication #{{item.id}}</div> <!-- Titre de la fabrication -->
                <div class="meta">
                  <div class="date">{{item.createdAt | date:'dd/MM/yyyy'}}</div> <!-- Date de création formatée -->
                  <div class="status" [ngClass]="item.statusClass">
                    {{item.statusText}} <!-- Statut de la fabrication -->
                  </div>
                </div>
                <div class="quantity">2</div> <!-- Quantité fixe (à adapter selon les besoins) -->
              </div>

              <div class="content">
                <div>{{item.type}}</div> <!-- Type de fabrication -->
                <div class="price-details">
                  <div>Prix Total: {{item.totalPrice || 40 | currency:'EUR'}}</div> <!-- Prix total formaté en euros -->
                  <div>Acompte (30%): {{(item.totalPrice * 0.3) || 12 | currency:'EUR'}}</div> <!-- Acompte de 30% formaté en euros -->
                </div>
              </div>

              <div class="footer">
                <div>Total: {{item.totalPrice || 40 | currency:'EUR'}}</div> <!-- Prix total formaté en euros -->
                @if (item.status === 'EN_ATTENTE_ACOMPTE') {
                  <a class="btn-primary" [routerLink]="['/manufacturing/payment', item.id]">
                    Payer l'acompte <!-- Bouton pour payer l'acompte si le statut est 'EN_ATTENTE_ACOMPTE' -->
                  </a>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .manufacturing-list {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .fabrication-item {
      background: white;
      margin-bottom: 20px;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .header {
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      font-weight: 500;
    }

    .meta {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .date {
      color: #666;
    }

    .status {
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 0.9em;
      font-weight: 500;
    }

    .status-pending { background-color: #ffc107; color: #000; }
    .status-deposit { background-color: #17a2b8; color: #fff; }
    .status-progress { background-color: #007bff; color: #fff; }
    .status-ready { background-color: #28a745; color: #fff; }
    .status-completed { background-color: #198754; color: #fff; }

    .quantity {
      background: #1976d2;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .content {
      padding: 15px;
      border-top: 1px solid #eee;
    }

    .price-details {
      margin-top: 10px;
      color: #666;
    }

    .footer {
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #eee;
    }

    .btn-primary {
      background: #007bff;
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      text-decoration: none;
    }

    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .loading {
      text-align: center;
      padding: 20px;
    }

    .empty-state {
      text-align: center;
      padding: 20px;
    }
  `]
})
export class ManufacturingListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>(); // Subject pour gérer la destruction des subscriptions
  private refreshInterval: any; // Intervalle pour le rafraîchissement des données
  manufacturingItems: Manufacturing[] = []; // Liste des fabrications
  readonly totalPrice = 40; // Prix fixe de 40€
  readonly deposit = 12; // Acompte de 30% (12€)
  loading = true; // Indicateur de chargement

  // Injection des dépendances dans le constructeur
  constructor(
    private manufacturingService: ManufacturingService, // Service pour récupérer les fabrications
    private notificationService: NotificationService // Service pour afficher des notifications
  ) {}

  // Méthode du cycle de vie Angular appelée après la création du composant
  ngOnInit() {
    this.loadManufacturingItems(); // Chargement des fabrications
  }

  // Méthode du cycle de vie Angular appelée avant la destruction du composant
  ngOnDestroy() {
    // Nettoyer l'intervalle quand le composant est détruit
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.destroy$.next(); // Émettre un signal pour terminer les subscriptions
    this.destroy$.complete(); // Compléter le Subject
  }

  // Méthode pour charger les fabrications
  loadManufacturingItems() {
    this.loading = true; // Activer l'indicateur de chargement
    this.manufacturingService.getClientManufacturingItems().subscribe({
      next: (items) => {
        console.log('Items reçus:', items); // Log des items reçus
        this.manufacturingItems = items; // Assigner les items à la propriété manufacturingItems
        this.loading = false; // Désactiver l'indicateur de chargement
      },
      error: (error) => {
        console.error('Erreur chargement fabrications:', error); // Log de l'erreur
        this.notificationService.error('Erreur lors du chargement des fabrications'); // Afficher une notification d'erreur
        this.loading = false; // Désactiver l'indicateur de chargement
      }
    });
  }
}