import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypeService } from '../../services/type/type.service';
import { Type } from '../../models/type/type.model';

@Component({
  selector: 'app-type',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="types-container">
      <div class="header">
        <h2>Types de produits</h2>
        <!-- Bouton pour afficher ou masquer le formulaire de création de type -->
        <button class="add-btn" (click)="showForm = !showForm">
          {{ showForm ? 'Annuler' : 'Ajouter un type' }}
        </button>
      </div>

      <!-- Affichage des messages d'erreur -->
      @if (error) {
        <div class="alert error">{{ error }}</div>
      }

      <!-- Affichage des messages de succès -->
      @if (success) {
        <div class="alert success">{{ success }}</div>
      }

      <!-- Formulaire de création de type -->
      @if (showForm) {
        <div class="type-form">
          <form (ngSubmit)="createType()">
            <!-- Champ pour le nom du type -->
            <div class="form-group">
              <label for="name">Nom*</label>
              <input
                id="name"
                type="text"
                [(ngModel)]="newType.name"
                name="name"
                placeholder="Ex: Crèmes hydratantes"
                required
                maxlength="200"
              >
            </div>

            <!-- Champ pour la description du type -->
            <div class="form-group">
              <label for="description">Description*</label>
              <textarea
                id="description"
                [(ngModel)]="newType.description"
                name="description"
                placeholder="Description du type de produit"
                required
                rows="3"
              ></textarea>
            </div>

            <!-- Champ pour l'icône du type -->
            <div class="form-group">
              <label for="icon">Icône*</label>
              <select
                id="icon"
                [(ngModel)]="newType.icon"
                name="icon"
                required
                class="icon-select"
              >
                <option value="">Sélectionner une icône</option>
                <option value="🧴">🧴 Crèmes & Lotions</option>
                <option value="👄">👄 Soins des lèvres</option>
                <option value="👁️">👁️ Soins des yeux</option>
                <option value="✨">✨ Soins visage</option>
                <option value="💅">💅 Soins des ongles</option>
                <option value="💆‍♀️">💆‍♀️ Massages</option>
                <option value="🛁">🛁 Soins corps</option>
                <option value="💄">💄 Maquillage</option>
                <option value="🌿">🌿 Naturel & Bio</option>
                <option value="🧪">🧪 Traitements spécifiques</option>
                <option value="☀️">☀️ Protection solaire</option>
                <option value="🌺">🌺 Parfums</option>
                <option value="💇‍♀️">💇‍♀️ Soins cheveux</option>
                <option value="🎁">🎁 Coffrets</option>
                <option value="⭐">⭐ Premium</option>
              </select>
            </div>

            <!-- Bouton de soumission du formulaire -->
            <div class="form-actions">
              <button type="submit" [disabled]="isLoading">
                {{ isLoading ? 'Création...' : 'Créer le type' }}
              </button>
            </div>
          </form>
        </div>
      }

      <!-- Liste des types de produits -->
      <div class="types-list">
        @for (type of types; track type.id_type) {
          <div class="type-card">
            <div class="type-icon">{{ type.icon }}</div>
            <div class="type-content">
              <h3>{{ type.name }}</h3>
              <p>{{ type.description }}</p>
            </div>
            <div class="type-actions">
              <!-- Bouton pour modifier un type -->
              <button class="edit-btn" (click)="editType(type)">
                ✏️ Modifier
              </button>
              <!-- Bouton pour supprimer un type -->
              <button class="delete-btn" (click)="confirmDelete(type)">
                🗑️ Supprimer
              </button>
            </div>
          </div>
        }

        <!-- Message si aucun type n'est disponible -->
        @if (types.length === 0) {
          <div class="no-types">
            Aucun type de produit n'a été créé
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    /* Styles pour le composant */
    .types-container {
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;

      h2 {
        font-size: 1.5rem;
        color: #333;
        margin: 0;
      }
    }

    .add-btn {
      background: #4f46e5;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: #4338ca;
      }
    }

    .type-form {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #4b5563;
        font-weight: 500;
      }

      input, textarea, select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        font-size: 0.95rem;

        &:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
      }
    }

    .form-actions {
      margin-top: 1.5rem;

      button {
        width: 100%;
        padding: 0.75rem;
        background: #4f46e5;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;

        &:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
      }
    }

    .types-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    .type-card {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-2px);
      }

      .type-icon {
        font-size: 2rem;
        text-align: center;
      }

      .type-content {
        h3 {
          margin: 0 0 0.5rem 0;
          color: #1a1a1a;
        }

        p {
          margin: 0;
          color: #6b7280;
          font-size: 0.9rem;
        }
      }

      .type-actions {
        display: flex;
        gap: 0.5rem;

        button {
          flex: 1;
          padding: 0.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;

          &.edit-btn {
            background: #4f46e5;
            color: white;
          }

          &.delete-btn {
            background: #ef4444;
            color: white;
          }
        }
      }
    }

    .no-types {
      grid-column: 1 / -1;
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      color: #6b7280;
    }

    .alert {
      padding: 1rem;
      border-radius: 6px;
      margin-bottom: 1rem;

      &.error {
        background: #fee2e2;
        color: #dc2626;
      }

      &.success {
        background: #dcfce7;
        color: #16a34a;
      }
    }
  `]
})
export class TypeComponent implements OnInit {
  types: Type[] = [];
  newType: Partial<Type> = {
    name: '',
    description: '',
    icon: ''
  };
  showForm = false;
  isLoading = false;
  error = '';
  success = '';

  constructor(private typeService: TypeService) {}

  ngOnInit(): void {
    this.loadTypes();
  }

  // Charger tous les types de produits
  loadTypes(): void {
    this.typeService.getTypes().subscribe({
      next: (types) => this.types = types,
      error: (err) => this.error = 'Erreur lors du chargement des types'
    });
  }

  // Créer un nouveau type de produit
  createType(): void {
    if (!this.newType.name?.trim() || !this.newType.description?.trim() || !this.newType.icon) {
      this.error = 'Tous les champs sont obligatoires';
      return;
    }

    if (this.newType.name.length > 200) {
      this.error = 'Le nom ne doit pas dépasser 200 caractères';
      return;
    }

    // Vérifier si le type existe déjà
    if (this.types.some(t => t.name.toLowerCase() === this.newType.name?.toLowerCase())) {
      this.error = 'Ce type existe déjà';
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.typeService.createType(this.newType).subscribe({
      next: () => {
        this.success = 'Type créé avec succès';
        this.loadTypes();
        this.resetForm();
      },
      error: (err) => {
        this.error = 'Erreur lors de la création du type';
        console.error(err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Modifier un type de produit
  editType(type: Type): void {
    this.newType = { ...type };
    this.showForm = true;
  }

  // Confirmer la suppression d'un type de produit
  confirmDelete(type: Type): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le type "${type.name}" ?`)) {
      this.deleteType(type.id_type);
    }
  }

  // Supprimer un type de produit
  deleteType(id: number): void {
    this.typeService.deleteType(id).subscribe({
      next: () => {
        this.success = 'Type supprimé avec succès';
        this.loadTypes();
      },
      error: (err) => {
        this.error = 'Erreur lors de la suppression';
        console.error(err);
      }
    });
  }

  // Réinitialiser le formulaire de création de type
  private resetForm(): void {
    this.newType = {
      name: '',
      description: '',
      icon: ''
    };
    this.showForm = false;
  }
}
