import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Type } from '../../../../../models/type/type.model';
import { TypeService } from '../../../../../services/type/type.service';
import { NotificationService } from '../../../../../services/notification/notification.service';

@Component({
  selector: 'app-admin-types',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="types-management">
      <!-- En-tête -->
      <div class="page-header">
        <h1>Catégories de Médicaments et Produits</h1>
      </div>

      <!-- État de chargement -->
      @if (loading) {
        <div class="loading-state">
          <span class="loader"></span>
          <p>Chargement des catégories...</p>
        </div>
      }

      <!-- Affichage des erreurs -->
      @if (error) {
        <div class="error-state">
          <p>{{ error }}</p>
          <button (click)="loadTypes()">Réessayer</button>
        </div>
      }

      <!-- Grille des types -->
      <div class="types-grid">
        @for (type of types; track type.id_type) {
          <div class="type-card" [class.requires-prescription]="type.prescription_required">
            <div class="card-content">
              <div class="type-icon">{{ type.icon }}</div>
              <div class="type-details">
                @if (type.prescription_required) {
                  <span class="prescription-badge">Ordonnance requise</span>
                }
                <h3>{{ type.name }}</h3>
                <p>{{ type.description }}</p>
              </div>
              <div class="card-actions">
                <button class="action-btn edit" (click)="editType(type)">
                  Modifier
                </button>
                <button class="action-btn delete" (click)="confirmDelete(type)">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        }

        <!-- Bouton ajouter -->
        <div class="add-card" (click)="startAdd()">
          <div class="add-content">
            <i class="fas fa-plus"></i>
            <span>Ajouter une catégorie</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de formulaire -->
    @if (showForm) {
      <div class="modal-overlay">
        <div class="modal-content">
          <h3>{{ editingType ? 'Modifier' : 'Ajouter' }} une catégorie</h3>
          <form #typeForm="ngForm" (ngSubmit)="onSubmit()" novalidate>
            <!-- Champ Nom -->
            <div class="form-group">
              <label>Nom</label>
              <input
                [(ngModel)]="currentType.name"
                name="name"
                required
                #name="ngModel"
                [class.invalid]="name.invalid && name.touched"
              >
              @if (name.invalid && name.touched) {
                <div class="error-message">Le nom est requis</div>
              }
            </div>

            <!-- Champ Description -->
            <div class="form-group">
              <label>Description</label>
              <textarea
                [(ngModel)]="currentType.description"
                name="description"
                required
                #description="ngModel"
                [class.invalid]="description.invalid && description.touched"
              ></textarea>
              @if (description.invalid && description.touched) {
                <div class="error-message">La description est requise</div>
              }
            </div>

            <!-- Sélection Icône -->
            <div class="form-group">
              <label>Icône</label>
              <select
                [(ngModel)]="currentType.icon"
                name="icon"
                required
                #icon="ngModel"
                [class.invalid]="icon.invalid && icon.touched"
              >
                <option value="">Sélectionner une icône</option>
                <option value="💊">💊 Médicaments</option>
                <option value="🏥">🏥 Ordonnance</option>
                <option value="🧪">🧪 Préparations</option>
                <option value="🌿">🌿 Naturel</option>
                <option value="🩺">🩺 Matériel médical</option>
                <option value="👶">👶 Pédiatrie</option>
                <option value="🦷">🦷 Dentaire</option>
                <option value="👁️">👁️ Optique</option>
                <option value="🧴">🧴 Dermocosmétique</option>
                <option value="🩹">🩹 Premiers secours</option>
                <option value="♿">♿ Maintien à domicile</option>
              </select>
              @if (icon.invalid && icon.touched) {
                <div class="error-message">L'icône est requise</div>
              }
            </div>

            <!-- Checkbox Ordonnance -->
            <div class="form-group">
              <label>
                <input
                  type="checkbox"
                  [(ngModel)]="currentType.prescription_required"
                  name="prescription_required"
                >
                Ordonnance requise
              </label>
            </div>

            <!-- Boutons d'action -->
            <div class="form-actions">
              <button type="button" class="cancel-btn" (click)="cancelEdit()">
                Annuler
              </button>
              <button
                type="submit"
                class="confirm-btn"
                [disabled]="typeForm.invalid || !currentType.name || !currentType.description || !currentType.icon"
              >
                {{ editingType ? 'Modifier' : 'Ajouter' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Modal de confirmation de suppression -->
    @if (showDeleteModal) {
      <div class="modal-overlay">
        <div class="modal-content">
          <h3>Confirmation de suppression</h3>
          <p>Êtes-vous sûr de vouloir supprimer cette catégorie ?</p>
          <div class="form-actions">
            <button class="cancel-btn" (click)="cancelDelete()">Annuler</button>
            <button class="delete-btn" (click)="deleteType()">Confirmer</button>
          </div>
        </div>
      </div>
    }

  `,
  styles: [`
    // Container et Layout
    .types-management {
      padding: 2rem;
    }

    .page-header h1 {
      font-size: 1.5rem;
      color: #333;
      margin-bottom: 2rem;
    }

    .types-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    // Carte Type
    .type-card {
      min-height: 150px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.2s;
      padding: 20px;
      margin-bottom: 1rem;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        .card-actions {
          opacity: 1;
        }
      }
    }

    // Style pour ordonnance requise
    .requires-prescription {
      border-color: #fecaca;
      background: linear-gradient(to bottom, white, #fff5f5);

      .prescription-badge {
        background: #fee2e2;
        color: #dc2626;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.75rem;
        margin-bottom: 0.5rem;
        display: inline-block;
      }
    }

    // Contenu carte
    .card-content {
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    // Icône
    .type-icon {
      width: 48px;
      height: 48px;
      background: #f3f4f6;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    // Détails
    .type-details {
      flex: 1;

      h3 {
        margin: 0;
        font-size: 1.125rem;
        color: #1f2937;
        font-weight: 600;
      }

      p {
        margin: 0.5rem 0 0;
        color: #6b7280;
        font-size: 0.875rem;
      }
    }

    // Boutons d'action
    .card-actions {
      display: flex;
      background: #f9fafb;
      opacity: 0;  // Rendre les boutons toujours visibles
      transition: opacity 0.2s;
      gap: 0.5rem;
      padding: 0; // Supprimer le padding qui peut causer des problèmes d'affichage

      .action-btn {
        flex: 1;
        padding: 0.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 80px; // Assurer une largeur minimale

        &.edit {
          background: #4f46e5;
          color: white;

          &:hover {
            background: #4338ca;
          }
        }

        &.delete {
          background: #fee2e2;
          color: #dc2626;

          &:hover {
            background: #fecaca;
          }
        }
      }
    }
    .type-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 180px;
      padding: 1.5rem;

      .card-content {
        padding: 0;
        box-shadow: none;
      }
    }
    // Carte d'ajout
    .add-card {
      border: 2px dashed #e5e7eb;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      min-height: 180px;

      &:hover {
        border-color: #4f46e5;
        background: #f3f4f6;

        .add-content {
          color: #4f46e5;
        }
      }

      .add-content {
        text-align: center;
        color: #6b7280;
        transition: color 0.2s;

        i {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          display: block;
        }

        span {
          font-size: 0.875rem;
          font-weight: 500;
        }
      }
    }

    // Modal
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      width: 100%;
      max-width: 500px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    // Formulaire
    .form-group {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #374151;
      }

      input, select, textarea {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 4px;
      }
    }

    // États et messages
    .loading-state, .error-state {
      text-align: center;
      padding: 2rem;
    }

    .error-message {
      color: #dc2626;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }

    .error-state {
      color: #dc2626;
    }

    // Boutons du formulaire
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;

      button {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        transition: all 0.2s;

        &.cancel-btn {
          background: #f3f4f6;
          color: #4b5563;
        }

        &.confirm-btn {
          background: #4f46e5;
          color: white;

          &:disabled {
            background: #9ca3af;
            cursor: not-allowed;
          }
        }

        &.delete-btn {
          background: #dc2626;
          color: white;
        }
      }
    }
  `]})
  export class AdminTypesComponent implements OnInit {
    // Propriétés
    types: Type[] = [];
    loading = false;
    error = '';
    showForm = false;
    showDeleteModal = false;
    editingType: Type | null = null;
    typeToDelete: Type | null = null;

    currentType: Partial<Type> = {
      name: '',
      description: '',
      icon: '',
      prescription_required: false
    };

    constructor(
      private typeService: TypeService,
      private notificationService: NotificationService
    ) {
    }

    ngOnInit(): void {
      this.loadTypes();
    }

    // Chargement des types
    loadTypes(): void {
      this.loading = true;
      this.error = '';

      this.typeService.getTypes().subscribe({
        next: (types) => {
          this.types = types;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors du chargement des types';
          this.loading = false;
          console.error('Erreur:', error);
        }
      });
    }

    // Gestion du formulaire d'ajout
    startAdd(): void {
      this.editingType = null;
      this.resetForm();
      this.showForm = true;
    }

    // Gestion de la modification
    editType(type: Type): void {
      this.editingType = type;
      this.currentType = {...type};
      this.showForm = true;
    }

    // Gestion de la suppression
    confirmDelete(type: Type): void {
      this.typeToDelete = type;
      this.showDeleteModal = true;
    }

    cancelDelete(): void {
      this.typeToDelete = null;
      this.showDeleteModal = false;
    }

    cancelEdit(): void {
      this.showForm = false;
      this.editingType = null;
      this.resetForm();
    }

    // Soumission du formulaire
    onSubmit(): void {
      if (!this.currentType.name || !this.currentType.description || !this.currentType.icon) {
        this.notificationService.error('Veuillez remplir tous les champs obligatoires');
        return;
      }

      if (this.editingType) {
        this.updateExistingType();
      } else {
        this.createNewType();
      }
    }

    private updateExistingType(): void {
      if (!this.editingType) return;

      this.typeService.updateType(this.editingType.id_type, this.currentType).subscribe({
        next: () => {
          this.notificationService.success('Type modifié avec succès');
          this.loadTypes();
          this.cancelEdit();
        },
        error: (error) => {
          if (error.status === 409) {
            this.notificationService.error('Ce type existe déjà');
          } else {
            this.notificationService.error('Erreur lors de la modification');
          }
        }
      });
    }

    private createNewType(): void {
      this.typeService.getTypes().subscribe(types => {
        const exists = types.some(t =>
          t.name.toLowerCase() === this.currentType.name?.toLowerCase()
        );

        if (exists) {
          this.notificationService.error('Ce type existe déjà');
          return;
        }

        this.typeService.createType(this.currentType).subscribe({
          next: () => {
            this.notificationService.success('Type ajouté avec succès');
            this.loadTypes();
            this.cancelEdit();
          },
          error: () => {
            this.notificationService.error('Erreur lors de la création');
          }
        });
      });
    }

    // Suppression d'un type
    deleteType(): void {
      if (!this.typeToDelete) return;

      this.loading = true;
      this.typeService.deleteType(this.typeToDelete.id_type).subscribe({
        next: () => {
          this.notificationService.success('Type supprimé avec succès');
          this.loadTypes();
          this.cancelDelete();
        },
        error: (error) => {
          if (error.status === 409) {
            this.notificationService.error(
              'Ce type ne peut pas être supprimé car il est associé à des produits'
            );
          } else {
            this.notificationService.error('Erreur lors de la suppression');
          }
        },
        complete: () => {
          this.loading = false;
        }
      });
    }

    // Réinitialisation du formulaire
    private resetForm(): void {
      this.currentType = {
        name: '',
        description: '',
        icon: '',
        prescription_required: false
      };
    }
  }

