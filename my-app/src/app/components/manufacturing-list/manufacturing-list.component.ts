// Importation des modules nécessaires d'Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importation des services personnalisés
import { ManufacturingService } from '../../services/manufacturing.service';
import { ManufacturingNotificationService } from '../../services/notification/manufacturing-notification.service';

// Importation du modèle de données
import { Manufacturing } from '../../models/manufacturing/manufacturing.model';

// Déclaration du composant Angular
@Component({
  selector: 'app-manufacturing-list', // Sélecteur du composant
  standalone: true, // Indique que ce composant est autonome
  imports: [CommonModule, FormsModule], // Importation des modules nécessaires
  template: `
    <div class="manufacturing-container">
      <h2>Gestion des Fabrications</h2>

      <!-- Grille pour afficher les éléments de fabrication -->
      <div class="manufacturing-grid">
        <!-- Boucle sur chaque élément de fabrication -->
        <div *ngFor="let item of manufacturingItems" class="manufacturing-card">
          <div class="card-header">
            <!-- Affichage de l'ID de la commande -->
            <h3>Commande #{{item.orderId}}</h3>
            <!-- Affichage du statut avec une classe dynamique pour le style -->
            <span [class]="'status-badge ' + item.status.toLowerCase()">
              {{item.status}}
            </span>
          </div>

          <div class="card-body">
            <!-- Affichage de la date de début -->
            <p>Date début: {{item.startDate | date:'short'}}</p>
            <!-- Affichage de la date de fin, si disponible -->
            <p *ngIf="item.completionDate">
              Terminé le: {{item.completionDate | date:'short'}}
            </p>

            <!-- Section pour mettre à jour le statut et les notes -->
            <div class="status-update">
              <!-- Sélection du statut -->
              <select [(ngModel)]="item.statusId"
                      (change)="updateStatus(item.id, item.statusId)">
                <option [value]="1">En attente</option>
                <option [value]="2">En préparation</option>
                <option [value]="3">Contrôle qualité</option>
                <option [value]="4">Terminé</option>
              </select>

              <!-- Champ de texte pour les notes -->
              <textarea [ngModel]="item.notes"
                        (ngModelChange)="item.notes = $event"
                        placeholder="Notes de fabrication"
                        (blur)="updateNotes(item.id, item.notes || '')">
              </textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .manufacturing-container {
      padding: 20px;
    }

    .manufacturing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .manufacturing-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .status-badge {
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 0.9em;
    }

    .status-badge.en-attente { background: #ffd700; }
    .status-badge.en-preparation { background: #87ceeb; }
    .status-badge.controle-qualite { background: #ffa500; }
    .status-badge.termine { background: #90ee90; }

    .status-update {
      margin-top: 15px;
    }

    select, textarea {
      width: 100%;
      margin-top: 10px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class ManufacturingListComponent implements OnInit {
  manufacturingItems: Manufacturing[] = []; // Liste des éléments de fabrication

  constructor(
    private manufacturingService: ManufacturingService, // Service pour les opérations de fabrication
    private notificationService: ManufacturingNotificationService // Service pour les notifications
  ) {}

  ngOnInit() {
    this.loadManufacturingItems(); // Chargement des éléments de fabrication au démarrage
  }

  loadManufacturingItems() {
    // Appel au service pour obtenir tous les éléments de fabrication
    this.manufacturingService.getAllManufacturing()
      .subscribe({
        next: (items) => {
          this.manufacturingItems = items; // Mise à jour de la liste des éléments
        },
        error: (error) => console.error('Erreur lors du chargement des fabrications:', error) // Log en cas d'erreur
      });
  }

  updateStatus(id: number, statusId: number) {
    // Appel au service pour mettre à jour le statut d'un élément
    this.manufacturingService.updateStatus(id, statusId)
      .subscribe({
        next: (response) => {
          this.notificationService.notifyManufacturingUpdate(response); // Notification de la mise à jour
          this.loadManufacturingItems(); // Rechargement des éléments
        },
        error: (error) => console.error('Erreur lors de la mise à jour:', error) // Log en cas d'erreur
      });
  }

  updateNotes(id: number, notes: string) {
    const currentItem = this.manufacturingItems.find(item => item.id === id); // Recherche de l'élément actuel
    if (currentItem) {
      // Appel au service pour mettre à jour les notes d'un élément
      this.manufacturingService.updateStatus(id, currentItem.statusId, notes)
        .subscribe({
          next: (response) => {
            this.notificationService.notifyManufacturingUpdate(response); // Notification de la mise à jour
            this.loadManufacturingItems(); // Rechargement des éléments
          },
          error: (error) => console.error('Erreur lors de la mise à jour des notes:', error) // Log en cas d'erreur
        });
    }
  }
}
