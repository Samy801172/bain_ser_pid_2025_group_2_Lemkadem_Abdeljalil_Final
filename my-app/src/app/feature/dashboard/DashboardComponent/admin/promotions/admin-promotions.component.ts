// feature/Dashboard/DashboardComponent/admin/promotions/admin-promotions.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Promotion, PromotionPayload } from '../../../../../models/promotion/promotion.model';
import {PromotionService} from '../../../../../services/promotion/promotion.service';
import {NotificationService} from '../../../../../services/notification/notification.service';

interface ApiPromotion extends Omit<Promotion, 'startDate' | 'endDate'> {
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-admin-promotions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="promotions-container">
      <header class="page-header">
        <h2>Gestion des Promotions</h2>
        <button class="add-btn" (click)="showAddForm = true">
          Nouvelle Promotion
        </button>
      </header>

      <!-- Liste des promotions -->
      <div class="promotions-grid">
        @for (promo of promotions; track promo.id_promotion) {
          <div class="promotion-card">
            <div class="promotion-content">
              <h3>{{ promo.description }}</h3>
              <div class="promo-details">
                <span class="discount">-{{ promo.discountPercentage }}%</span>
                <div class="dates">
                  <span>Du: {{ promo.startDate | date }}</span>
                  <span>Au: {{ promo.endDate | date }}</span>
                </div>
                <span class="status" [class.active]="isActive(promo)">
                  {{ isActive(promo) ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </div>
            <div class="promotion-actions">
              <button class="edit-btn" (click)="editPromotion(promo)">Modifier</button>
              <button class="delete-btn" (click)="deletePromotion(promo.id_promotion)">
                Supprimer
              </button>
            </div>
          </div>
        } @empty {
          <div class="no-data">Aucune promotion disponible</div>
        }
      </div>

      <!-- Formulaire d'ajout/modification -->
      @if (showAddForm) {
        <div class="modal-overlay">
          <div class="modal-content">
            <h3>{{ editingPromotion ? 'Modifier la promotion' : 'Nouvelle promotion' }}</h3>
            <form (ngSubmit)="onSubmit()" #promoForm="ngForm">
              <div class="form-group">
                <label for="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  [(ngModel)]="currentPromotion.description"
                  required
                >
              </div>

              <div class="form-group">
                <label for="discount">Réduction (%)</label>
                <input
                  type="number"
                  id="discount"
                  name="discountPercentage"
                  [(ngModel)]="currentPromotion.discountPercentage"
                  required
                  min="0"
                  max="100"
                >
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="startDate">Date de début</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    [(ngModel)]="currentPromotion.startDate"
                    required
                  >
                </div>

                <div class="form-group">
                  <label for="endDate">Date de fin</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    [(ngModel)]="currentPromotion.endDate"
                    required
                  >
                </div>
              </div>

              <div class="form-actions">
                <button type="button" class="cancel-btn" (click)="cancelEdit()">
                  Annuler
                </button>
                <button
                  type="submit"
                  class="confirm-btn"
                  [disabled]="!promoForm.valid"
                >
                  {{ editingPromotion ? 'Mettre à jour' : 'Créer' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .promotions-container {
      padding: 20px;
      max-width: 1000px;
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
        background: #0066CC;
        &:hover {
          background: #0052a3;
        }
      }

      .promotion-card {
        &.active::before {
          background: #0066CC;
        }
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

      input {
        width: 100%;
        padding: 8px;
        border: 1px solid #d1d5db;
        border-radius: 4px;

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

    .promotions-list {
      display: grid;
      gap: 15px;
    }

    .promotion-card {
      background: white;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: relative;
      overflow: hidden;

      &.active::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: #16a34a;
      }
    }

    .no-data {
      padding: 40px;
      text-align: center;
      color: #666;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
// Composant de gestion des promotions pour l'interface administrateur
export class AdminPromotionsComponent implements OnInit {
  // Tableau stockant toutes les promotions
  promotions: Promotion[] = [];
  // Contrôle l'affichage du formulaire d'ajout/édition
  showAddForm = false;
  // Promotion en cours d'édition
  editingPromotion: Promotion | null = null;
  // Modèle pour la promotion en cours (création ou édition)
  currentPromotion: PromotionPayload = {
    description: '',
    startDate: '',
    endDate: '',
    discountPercentage: 0
  };

  constructor(
    private promotionService: PromotionService, // Service de gestion des promotions
    private notificationService: NotificationService // Service de notifications
  ) {}

  // Initialisation du composant
  ngOnInit(): void {
    this.loadPromotions();
  }

  // Charge toutes les promotions depuis le service
  loadPromotions(): void {
    this.promotionService.getAllPromotions().subscribe({
      next: (promotions) => {
        this.promotions = promotions;
      }
    });
  }

  // Vérifie si une promotion est actuellement active
  isActive(promotion: Promotion): boolean {
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    return now >= startDate && now <= endDate;
  }

  // Gère la soumission du formulaire
  onSubmit(): void {
    if (!this.validateDates()) {
      this.notificationService.error('Les dates ne sont pas valides');
      return;
    }

    if (this.editingPromotion) {
      this.updatePromotion();
    } else {
      this.createPromotion();
    }
  }

  // Valide les dates de la promotion
  // La date de début doit être postérieure à aujourd'hui
  // La date de fin doit être postérieure à la date de début
  private validateDates(): boolean {
    const startDate = new Date(this.currentPromotion.startDate);
    const endDate = new Date(this.currentPromotion.endDate);
    const now = new Date();

    return startDate >= now && endDate > startDate;
  }

  // Crée une nouvelle promotion
  private createPromotion(): void {
    this.promotionService.createPromotion(this.currentPromotion).subscribe({
      next: () => {
        this.notificationService.success('Promotion créée avec succès');
        this.loadPromotions();
        this.cancelEdit();
      }
    });
  }

  // Met à jour une promotion existante
  private updatePromotion(): void {
    if (!this.editingPromotion) return;

    this.promotionService.updatePromotion(
      this.editingPromotion.id_promotion,
      this.currentPromotion
    ).subscribe({
      next: () => {
        this.notificationService.success('Promotion mise à jour avec succès');
        this.loadPromotions();
        this.cancelEdit();
      }
    });
  }

  // Prépare l'édition d'une promotion existante
  editPromotion(promotion: Promotion): void {
    this.editingPromotion = promotion;
    this.currentPromotion = {
      description: promotion.description,
      startDate: this.formatDateForInput(promotion.startDate),
      endDate: this.formatDateForInput(promotion.endDate),
      discountPercentage: promotion.discountPercentage
    };
    this.showAddForm = true;
  }

  // Formate une date pour l'affichage dans un input type="date"
  private formatDateForInput(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  // Annule l'édition en cours et réinitialise le formulaire
  cancelEdit(): void {
    this.showAddForm = false;
    this.editingPromotion = null;
    this.currentPromotion = {
      description: '',
      startDate: '',
      endDate: '',
      discountPercentage: 0
    };
  }

  // Supprime une promotion après confirmation
  deletePromotion(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette promotion ?')) {
      this.promotionService.deletePromotion(id).subscribe({
        next: () => {
          this.notificationService.success('Promotion supprimée avec succès');
          this.loadPromotions();
        }
      });
    }
  }
}