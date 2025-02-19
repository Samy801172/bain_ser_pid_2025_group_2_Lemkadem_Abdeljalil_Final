// feature/Dashboard/DashboardComponent/admin/products/product-form/admin-admin-product-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../../../services/product/product.service';
import { TypeService } from '../../../../../../services/type/type.service';
import { Type } from '../../../../../../models/type/type.model';
import { firstValueFrom } from 'rxjs';
import {Product} from '../../../../../../models/product/product.model';

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="admin-product-form">
      <div class="form-header">
        <h2>{{ isEditMode ? 'Modifier le produit' : 'Ajouter un produit' }}</h2>
        <button type="button" class="back-btn" (click)="goBack()">
          Retour
        </button>
      </div>

      @if (errorMessage) {
        <div class="error-alert">
          {{ errorMessage }}
        </div>
      }

      <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="form-container">
        <div class="form-group">
          <label for="name">Nom du produit*</label>
          <input
            id="name"
            type="text"
            formControlName="name"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('name')"
          >
          @if (isFieldInvalid('name')) {
            <div class="error-message">
              @if (productForm.get('name')?.errors?.['required']) {
                Le nom est requis
              } @else if (productForm.get('name')?.errors?.['minlength']) {
                Le nom doit contenir au moins 3 caractères
              }
            </div>
          }
        </div>

        <div class="form-group">
          <label for="description">Description*</label>
          <textarea
            id="description"
            formControlName="description"
            rows="4"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('description')"
          ></textarea>
          @if (isFieldInvalid('description')) {
            <div class="error-message">
              La description est requise
            </div>
          }
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="price">Prix*</label>
            <input
              id="price"
              type="number"
              formControlName="price"
              step="0.01"
              min="0"
              class="form-control"
              [class.is-invalid]="isFieldInvalid('price')"
            >
            @if (isFieldInvalid('price')) {
              <div class="error-message">
                Prix invalide
              </div>
            }
          </div>

          <div class="form-group">
            <label for="stock">Stock*</label>
            <input
              id="stock"
              type="number"
              formControlName="stock"
              min="0"
              class="form-control"
              [class.is-invalid]="isFieldInvalid('stock')"
            >
            @if (isFieldInvalid('stock')) {
              <div class="error-message">
                Stock invalide
              </div>
            }
          </div>
        </div>

        <div class="form-group">
          <label for="typeId">Type de produit*</label>
          <select
            id="typeId"
            formControlName="typeId"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('typeId')"
          >
            <option value="">Sélectionner un type</option>
            @for (type of types; track type.id_type) {
              <option [value]="type.id_type">{{ type.name }}</option>
            }
          </select>
          @if (isFieldInvalid('typeId')) {
            <div class="error-message">
              Le type est requis
            </div>
          }
        </div>

        <div class="form-group">
          <label>Image du produit</label>
          <div class="image-upload">
            <input
              type="file"
              (change)="onFileSelected($event)"
              accept="image/*"
              class="file-input"
            >
            @if (selectedFile) {
              <div class="selected-file">
                Fichier sélectionné: {{ selectedFile.name }}
              </div>
            }
            @if (currentImage) {
              <div class="current-image">
                <img [src]="currentImage" alt="Image actuelle">
                <button type="button" class="remove-image" (click)="removeImage()">
                  Supprimer
                </button>
              </div>
            }
          </div>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input
              type="checkbox"
              formControlName="active"
            > Produit actif
          </label>
        </div>

        <div class="form-actions">
          <button
            type="button"
            class="cancel-btn"
            (click)="goBack()"
          >
            Annuler
          </button>
          <button
            type="submit"
            class="submit-btn"
            [disabled]="productForm.invalid || isLoading"
          >
            @if (isLoading) {
              <span>Traitement en cours...</span>
            } @else {
              <span>{{ isEditMode ? 'Mettre à jour' : 'Ajouter' }}</span>
            }
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .admin-product-form {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;

      h2 {
        margin: 0;
        color: #1a1a1a;
      }
    }

    .form-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #4b5563;
        font-weight: 500;
      }
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      transition: all 0.2s;

      &:focus {
        outline: none;
        border-color: #4f46e5;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
      }

      &.is-invalid {
        border-color: #dc2626;
      }
    }

    .error-message {
      color: #dc2626;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .error-alert {
      background: #fee2e2;
      border: 1px solid #fecaca;
      color: #dc2626;
      padding: 1rem;
      border-radius: 6px;
      margin-bottom: 1.5rem;
    }

    .image-upload {
      padding: 1rem;
      border: 2px dashed #d1d5db;
      border-radius: 6px;

      .current-image {
        margin-top: 1rem;

        img {
          max-width: 200px;
          border-radius: 4px;
        }

        .remove-image {
          display: block;
          margin-top: 0.5rem;
          color: #dc2626;
          background: none;
          border: none;
          cursor: pointer;
        }
      }

      .selected-file {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: #4b5563;
      }
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;

      button {
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;

        &.submit-btn {
          background: #16a34a;
          color: white;
          border: none;

          &:hover:not(:disabled) {
            background: #15803d;
          }

          &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
        }

        &.cancel-btn {
          background: white;
          border: 1px solid #d1d5db;
          color: #4b5563;

          &:hover {
            background: #f9fafb;
          }
        }
      }
    }

    @media (max-width: 640px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminProductFormComponent implements OnInit {
  productForm: FormGroup = this.initForm();
  isLoading = false;
  isEditMode = false;
  errorMessage = '';
  selectedFile: File | null = null;
  currentImage: string | null = null;
  types: Type[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private typeService: TypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      active: [true],
      typeId: [null, Validators.required],
      requiresPrescription: [false]
    });
  }

  ngOnInit(): void {
    this.loadTypes();
    this.checkEditMode();
  }

  private loadTypes(): void {
    this.typeService.getTypes().subscribe({
      next: (types) => this.types = types,
      error: () => this.errorMessage = 'Erreur lors du chargement des types'
    });
  }

  private async checkEditMode(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      await this.loadProduct(Number(id));
    }
  }

  private async loadProduct(id: number): Promise<void> {
    try {
      const product = await firstValueFrom(this.productService.getProductById(id));
      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        active: product.active,
        typeId: product.typeId,
        requiresPrescription: false // valeur par défaut
      });
      this.currentImage = product.imageUrls?.[0] ?? null;
    } catch (error) {
      this.errorMessage = "Erreur lors du chargement du produit";
    }
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.invalid || this.isLoading) return;

    this.isLoading = true;
    try {
      const formValue = this.productForm.value;
      const productData: Product = {
        id_product: this.isEditMode ? Number(this.route.snapshot.params['id']) : 0,
        name: formValue.name,
        description: formValue.description,
        price: formValue.price,
        stock: formValue.stock,
        active: formValue.active,
        typeId: formValue.typeId,
        imageUrls: this.currentImage ? [this.currentImage] : []
      };

      if (this.isEditMode) {
        await firstValueFrom(
          this.productService.updateProduct(productData.id_product, productData)
        );
      } else {
        await firstValueFrom(this.productService.createProduct(productData));
      }

      this.router.navigate(['/admin/products']);
    } catch (error) {
      this.errorMessage = "Erreur lors de l'enregistrement du produit";
    } finally {
      this.isLoading = false;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  removeImage(): void {
    this.currentImage = null;
    this.selectedFile = null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }



  goBack(): void {
    this.router.navigate(['/admin/products']);
  }
}
