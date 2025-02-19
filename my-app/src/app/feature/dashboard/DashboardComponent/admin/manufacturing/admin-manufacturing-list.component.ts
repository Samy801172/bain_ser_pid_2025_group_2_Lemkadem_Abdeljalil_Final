// Composant pour la gestion admin des fabrications
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManufacturingService } from '../../../../../services/manufacturing/manufacturing.service';
import { Manufacturing, ManufacturingStatus } from '../../../../../models/manufacturing/manufacturing.model';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { ManufacturingNotificationService } from '../../../../../services/manufacturing/manufacturing-notification.service';

@Component({
  selector: 'app-admin-manufacturing-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="manufacturing-list">
      <h2>Gestion des Fabrications</h2>
      
      @if (loading) {
        <div class="loading">Chargement...</div>
      }

      @if (!loading && manufacturingItems.length > 0) {
        <div class="items-grid">
          @for (item of manufacturingItems; track item.id) {
            <div class="fabrication-item">
              <div class="header">
                <div class="title">Fabrication #{{item.id}}</div>
                <div class="meta">
                  <div class="date">{{item.createdAt | date:'dd/MM/yyyy'}}</div>
                  <div class="status" [attr.data-status]="item.status">
                    {{getStatusLabel(item.status)}}
                  </div>
                </div>
              </div>

              <div class="content">
                <div class="type">Type: {{item.type}}</div>
                <select [value]="item.status" (change)="updateStatus(item.id, $event)">
                  <option value="EN_ATTENTE_ACOMPTE">En attente d'acompte</option>
                  <option value="ACOMPTE_PAYE">Acompte payé</option>
                  <option value="EN_FABRICATION">En fabrication</option>
                  <option value="PRET">Prêt</option>
                  <option value="TERMINE">Terminé</option>
                </select>
                <button class="btn-details" (click)="viewDetails(item.id)">
                  Voir détails
                </button>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .manufacturing-list {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
      background: #f8f9fa;
    }

    h2 {
      color: #2c3e50;
      font-size: 24px;
      margin-bottom: 24px;
      font-weight: 600;
    }

    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 24px;
    }

    .fabrication-item {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .fabrication-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .header {
      padding: 20px;
      background: #fff;
      border-bottom: 1px solid #eef2f7;
    }

    .title {
      color: #2c3e50;
      font-size: 1.1em;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .date {
      color: #64748b;
      font-size: 0.9em;
    }

    .status {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.85em;
      font-weight: 500;
    }

    /* Styles pour tous les statuts */
    .status[data-status="EN_ATTENTE_ACOMPTE"] {
      background-color: #f97316;  /* Orange */
      color: white;
    }

    .status[data-status="ACOMPTE_PAYE"] {
      background-color: #f3f4f6;  /* Gris clair */
      color: #4b5563;
      border: 1px solid #e5e7eb;
    }

    .status[data-status="EN_FABRICATION"] {
      background-color: #2196F3;  /* Bleu */
      color: white;
    }

    .status[data-status="PRET"] {
      background-color: #10b981;  /* Vert */
      color: white;
    }

    .status[data-status="TERMINE"] {
      background-color: #6b7280;  /* Gris foncé */
      color: white;
    }

    .content {
      padding: 20px;
    }

    .type {
      color: #475569;
      margin-bottom: 16px;
      font-weight: 500;
    }

    select {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 0.95em;
      color: #475569;
      background-color: white;
      margin-bottom: 16px;
      transition: all 0.2s;
    }

    select:focus {
      outline: none;
      border-color: #93c5fd;
      box-shadow: 0 0 0 3px rgba(147,197,253,0.25);
    }

    /* Bouton orange */
    .btn-details {
      display: inline-block;
      padding: 8px 16px;
      background: #f97316;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 0.9em;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-details:hover {
      background: #ea580c;
      transform: translateY(-1px);
    }

    .loading {
      text-align: center;
      padding: 40px;
      color: #64748b;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #64748b;
      background: white;
      border-radius: 12px;
      margin-top: 24px;
    }
  `]
})
export class AdminManufacturingListComponent implements OnInit {
  manufacturingItems: Manufacturing[] = [];
  loading = true;

  constructor(
    private manufacturingService: ManufacturingService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadManufacturingItems();
  }

  loadManufacturingItems() {
    this.loading = true;
    this.manufacturingService.getAllManufacturingItems().subscribe({
      next: (items) => {
        this.manufacturingItems = items;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur chargement fabrications:', error);
        this.notificationService.error('Erreur lors du chargement des fabrications');
        this.loading = false;
      }
    });
  }

  getStatusLabel(status: ManufacturingStatus): string {
    const statusMap = {
      'EN_ATTENTE_ACOMPTE': 'En attente d\'acompte',
      'ACOMPTE_PAYE': 'Acompte payé',
      'EN_FABRICATION': 'En fabrication',
      'PRET': 'Prêt',
      'TERMINE': 'Terminé'
    };
    return statusMap[status] || 'Inconnu';
  }

  updateStatus(id: number, event: Event) {
    const newStatus = (event.target as HTMLSelectElement).value as ManufacturingStatus;
    
    this.manufacturingService.updateManufacturingStatus(id, newStatus).subscribe({
      next: (updatedManufacturing) => {
        this.manufacturingItems = this.manufacturingItems.map(item => 
          item.id === id ? {...item, status: newStatus} : item
        );
        this.notificationService.success('Statut mis à jour avec succès');
      },
      error: (error) => {
        console.error('Erreur mise à jour statut:', error);
        this.notificationService.error('Erreur lors de la mise à jour du statut');
      }
    });
  }

  viewDetails(id: number) {
    console.log('Voir détails de la fabrication:', id);
  }
} 