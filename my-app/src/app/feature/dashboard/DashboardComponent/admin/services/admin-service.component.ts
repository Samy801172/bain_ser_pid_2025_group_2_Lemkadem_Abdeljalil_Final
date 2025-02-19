// feature/Dashboard/DashboardComponent/admin/services/admin-services.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {CreateServiceDto} from '../../../../../models/Service/create-service.dto';
import {ServiceService} from '../../../../../services/Service/service.service';
import {NotificationService} from '../../../../../services/notification/notification.service';


interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;  // durée en minutes (nombre)
}

interface ServiceFormData {
  name: string;
  description: string;
  price: number;
  duration: number;  // durée en minutes (nombre)
}
@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="services-container">
      <header class="page-header">
        <h2>Gestion des Services</h2>
        <button class="add-btn" (click)="showAddForm = true">
          Nouveau Service
        </button>
      </header>

      @if (showAddForm) {
        <div class="form-container">
          <h3>{{ editingService ? 'Modifier le service' : 'Nouveau service' }}</h3>
          <form (ngSubmit)="saveService()" #serviceForm="ngForm">
            <div class="form-group">
              <label for="name">Nom du service*</label>
              <input
                id="name"
                [(ngModel)]="newService.name"
                name="name"
                required
                type="text"
                placeholder="Ex: Soin du visage"
                #nameInput="ngModel"
              >
              <div *ngIf="nameInput.invalid && (nameInput.dirty || nameInput.touched)" class="error-message">
                Le nom est requis
              </div>
            </div>

            <div class="form-group">
              <label for="description">Description*</label>
              <textarea
                id="description"
                [(ngModel)]="newService.description"
                name="description"
                required
                rows="3"
                placeholder="Décrivez le service..."
                #descInput="ngModel"
              ></textarea>
              <div *ngIf="descInput.invalid && (descInput.dirty || descInput.touched)" class="error-message">
                La description est requise
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="price">Prix (€)*</label>
                <input
                  id="price"
                  [(ngModel)]="newService.price"
                  name="price"
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  #priceInput="ngModel"
                >
                <div *ngIf="priceInput.invalid && (priceInput.dirty || priceInput.touched)" class="error-message">
                  Le prix doit être supérieur à 0
                </div>
              </div>

              <div class="form-group">
                <label for="duration">Durée (minutes)*</label>
                <input
                  id="duration"
                  [(ngModel)]="newService.duration"
                  name="duration"
                  required
                  type="number"
                  min="1"
                  #durationInput="ngModel"
                >
                <div *ngIf="durationInput.invalid && (durationInput.dirty || durationInput.touched)" class="error-message">
                  La durée doit être supérieure à 0 minutes
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit"
                      class="save-btn"
                      [disabled]="!serviceForm.valid">
                {{ editingService ? 'Mettre à jour' : 'Créer' }}
              </button>
              <button type="button" class="cancel-btn" (click)="cancelForm()">
                Annuler
              </button>
            </div>
          </form>
        </div>
      }

      <div class="services-grid">
        @for (service of services; track service.id) {
          <div class="service-card">
            <div class="service-content">
              <h3>{{service.name}}</h3>
              <p class="description">{{service.description}}</p>
              <div class="service-details">
                <span class="price">{{service.price | currency:'EUR'}}</span>
                <span class="duration">{{formatDuration(service.duration)}}</span>
              </div>
            </div>
            <div class="service-actions">
              <button class="edit-btn" (click)="editService(service)">
                Modifier
              </button>
              <button class="delete-btn" (click)="deleteService(service)">
                Supprimer
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .services-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h2 {
        color: #333;
        margin: 0;
      }

      .add-btn {
        background: #4f46e5;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background: #4338ca;
        }
      }
    }

    .form-container {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 20px;

      h3 {
        margin-top: 0;
        color: #333;
      }
    }

    .form-group {
      margin-bottom: 15px;

      label {
        display: block;
        margin-bottom: 5px;
        color: #4b5563;
      }

      input, textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        resize: vertical;

        &:focus {
          outline: none;
          border-color: #4f46e5;
        }
      }
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;

      button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &.save-btn {
          background: #16a34a;
          color: white;

          &:disabled {
            background: #d1d5db;
            cursor: not-allowed;
          }
        }

        &.cancel-btn {
          background: #dc2626;
          color: white;
        }
      }
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .service-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .service-content {
        h3 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 1.2em;
        }

        .description {
          color: #6b7280;
          margin: 10px 0;
          line-height: 1.5;
        }

        .service-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;

          .price {
            color: #4f46e5;
            font-weight: 600;
            font-size: 1.1em;
          }

          .duration {
            color: #6b7280;
            font-size: 0.9em;
          }
        }
      }

      .service-actions {
        display: flex;
        gap: 8px;
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #e5e7eb;

        button {
          flex: 1;
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9em;

          &.edit-btn {
            background: #4f46e5;
            color: white;
          }

          &.delete-btn {
            background: #dc2626;
            color: white;
          }

          &:hover {
            opacity: 0.9;
          }
        }
      }
    }

    .no-data {
      grid-column: 1 / -1;
      padding: 40px;
      text-align: center;
      color: #666;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .services-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
// Composant de gestion des services pour l'interface administrateur
export class AdminServicesComponent implements OnInit {
  // Tableau stockant tous les services
  services: Service[] = [];
  // Contrôle l'affichage du formulaire d'ajout/édition
  showAddForm = false;
  // Service en cours d'édition
  editingService: Service | null = null;
  // Modèle pour un nouveau service ou service en édition
  newService: CreateServiceDto = {
    name: '',
    description: '',
    price: 0,
    duration: 0
  };

  constructor(
    private serviceService: ServiceService, // Service de gestion des services
    private notificationService: NotificationService // Service de notifications
  ) {}

  // Initialisation du composant
  ngOnInit(): void {
    this.loadServices();
  }

  // Valide la durée entrée dans le formulaire
  validateDuration(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    // Convertir en nombre et s'assurer qu'il est valide
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0) {
      input.value = '0';
      this.newService.duration = 0;
    } else {
      this.newService.duration = numValue;
    }
  }

  // Formate la durée pour l'affichage (conversion minutes en heures/minutes)
  formatDuration(minutes: number): string {
    if (!minutes) return '0 min';
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ?
        `${hours}h${remainingMinutes}min` :
        `${hours}h`;
    }
    return `${minutes}min`;
  }

  // Charge tous les services depuis le service
  loadServices(): void {
    this.serviceService.getAllServices().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: () => {
        this.notificationService.error('Erreur lors du chargement des services');
      }
    });
  }

  // Sauvegarde un service (création ou mise à jour)
  saveService(): void {
    // Vérifie que la durée est valide
    if (this.newService.duration <= 0) {
      this.notificationService.error('La durée doit être supérieure à 0 minutes');
      return;
    }

    // Prépare les données du service
    const serviceData = {
      name: this.newService.name,
      description: this.newService.description,
      price: Number(this.newService.price),
      duration: String(this.newService.duration) // Conversion en string pour l'API
    };

    // Mise à jour d'un service existant
    if (this.editingService) {
      this.serviceService.updateService(this.editingService.id, serviceData).subscribe({
        next: () => {
          this.loadServices();
          this.cancelForm();
          this.notificationService.success('Service mis à jour avec succès');
        },
        error: (error) => {
          console.error('Erreur:', error);
          this.notificationService.error('Erreur lors de la mise à jour du service');
        }
      });
    } 
    // Création d'un nouveau service
    else {
      this.serviceService.createService(serviceData).subscribe({
        next: () => {
          this.loadServices();
          this.cancelForm();
          this.notificationService.success('Service créé avec succès');
        },
        error: (error) => {
          console.error('Erreur:', error);
          this.notificationService.error('Erreur lors de la création du service');
        }
      });
    }
  }

  // Prépare l'édition d'un service existant
  editService(service: Service): void {
    this.editingService = {...service};
    this.newService = {
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration
    };
    this.showAddForm = true;
  }

  // Supprime un service après confirmation
  deleteService(service: Service): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      this.serviceService.deleteService(service.id).subscribe({
        next: () => {
          this.loadServices();
          this.notificationService.success('Service supprimé avec succès');
        },
        error: (error) => {
          console.error('Erreur:', error);
          this.notificationService.error('Erreur lors de la suppression du service');
        }
      });
    }
  }

  // Réinitialise le formulaire et annule l'édition en cours
  cancelForm(): void {
    this.showAddForm = false;
    this.editingService = null;
    this.newService = {
      name: '',
      description: '',
      price: 0,
      duration: 0
    };
  }
}
