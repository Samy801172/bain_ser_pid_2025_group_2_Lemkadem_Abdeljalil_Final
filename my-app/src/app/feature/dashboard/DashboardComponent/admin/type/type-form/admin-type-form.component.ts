// feature/Dashboard/DashboardComponent/admin/types/type-form/admin-type-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TypeService } from '../../../../../../services/type/type.service';

@Component({
  selector: 'app-admin-type-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="type-form-container">
      <h2>Ajouter un type</h2>

      @if (errorMessage) {
        <div class="error-alert">
          {{ errorMessage }}
        </div>
      }

      @if (successMessage) {
        <div class="success-alert">
          {{ successMessage }}
        </div>
      }

      <form [formGroup]="typeForm" (ngSubmit)="onSubmit()" class="type-form">
        <!-- Nom du type -->
        <div class="form-group">
          <label for="name">Nom du type*</label>
          <input
            id="name"
            type="text"
            formControlName="name"
            maxlength="200"
            [class.error]="shouldShowError('name')"
          >
          @if (shouldShowError('name')) {
            <div class="error-message">
              @if (typeForm.get('name')?.errors?.['required']) {
                Le nom du type est obligatoire
              }
              @if (typeForm.get('name')?.errors?.['maxlength']) {
                Le nom ne doit pas dépasser 200 caractères
              }
            </div>
          }
        </div>

        <!-- Description -->
        <div class="form-group">
          <label for="description">Description*</label>
          <textarea
            id="description"
            formControlName="description"
            rows="3"
            [class.error]="shouldShowError('description')"
          ></textarea>
          @if (shouldShowError('description')) {
            <div class="error-message">
              La description est obligatoire
            </div>
          }
        </div>

        <!-- Icône -->
        <div class="form-group">
          <label for="icon">Icône*</label>
          <select
            id="icon"
            formControlName="icon"
            [class.error]="shouldShowError('icon')"
          >
            <option value="">Sélectionner une icône</option>
            <option value="🧴">🧴 Crèmes</option>
            <option value="💆‍♀️">💆‍♀️ Soins</option>
            <option value="💄">💄 Maquillage</option>
            <option value="👄">👄 Lèvres</option>
            <option value="✨">✨ Soins visage</option>
            <option value="💅">💅 Ongles</option>
            <option value="🌿">🌿 Bio & Naturel</option>
          </select>
          @if (shouldShowError('icon')) {
            <div class="error-message">
              L'icône est obligatoire
            </div>
          }
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" (click)="onCancel()">
            Annuler
          </button>
          <button type="submit" class="submit-btn">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .type-form-container {
      background: white;
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    h2 {
      color: #1a1a1a;
      margin-bottom: 2rem;
      font-weight: 500;
    }

    .form-group {
      margin-bottom: 1.5rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #374151;
        font-size: 0.875rem;
      }

      input, textarea, select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 0.875rem;

        &.error {
          border-color: #dc2626;
        }
      }

      textarea {
        resize: vertical;
      }

      select {
        background-color: white;
      }
    }

    .error-alert {
      background: #fee2e2;
      border: 1px solid #fecaca;
      color: #dc2626;
      padding: 0.75rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .success-alert {
      background: #dcfce7;
      border: 1px solid #bbf7d0;
      color: #15803d;
      padding: 0.75rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .error-message {
      color: #dc2626;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;

      button {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;

        &.cancel-btn {
          background: white;
          border: 1px solid #d1d5db;
          color: #4b5563;

          &:hover {
            background: #f3f4f6;
          }
        }

        &.submit-btn {
          background: #10b981;
          color: white;
          border: none;

          &:hover {
            background: #059669;
          }

          &:disabled {
            background: #9ca3af;
            cursor: not-allowed;
          }
        }
      }
    }
  `]
})
export class AdminTypeFormComponent implements OnInit {
  typeForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', [Validators.required]],
    icon: ['', [Validators.required]]
  });
  errorMessage = '';
  successMessage = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private typeService: TypeService,
    private router: Router
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.typeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.required]],
      icon: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  shouldShowError(fieldName: string): boolean {
    const field = this.typeForm.get(fieldName);
    return !!field && !field.valid && (field.dirty || field.touched);
  }

  async onSubmit(): Promise<void> {
    if (this.typeForm.invalid) {
      Object.keys(this.typeForm.controls).forEach(key => {
        const control = this.typeForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }

    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      // Vérifier si le type existe déjà
      const existingType = await this.typeService.checkTypeExists(this.typeForm.value.name).toPromise();

      if (existingType) {
        this.errorMessage = 'Ce type existe déjà';
        this.isSubmitting = false;
        return;
      }

      await this.typeService.createType(this.typeForm.value).toPromise();
      this.successMessage = 'Type ajouté avec succès';
      setTimeout(() => {
        this.router.navigate(['/admin/types']);
      }, 1500);

    } catch (error) {
      this.errorMessage = 'Erreur lors de la création du type';
    } finally {
      this.isSubmitting = false;
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/types']);
  }
}
