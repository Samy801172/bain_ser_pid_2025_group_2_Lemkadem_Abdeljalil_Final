import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../../services/product/product.service';
import { TypeService } from '../../../../../services/type/type.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { PromotionService } from '../../../../../services/promotion/promotion.service';
import { Product } from '../../../../../models/product/product.model';
import { Type } from '../../../../../models/type/type.model';
import { Promotion } from '../../../../../models/promotion/promotion.model';

// Dans admin-products.component.ts
interface ProductWithPromotion extends Product {
  activePromotion?: {
    id_promotion: number;
    description: string;
    discountPercentage: number;
    // Ajout des dates manquantes
    startDate: string | Date;
    endDate: string | Date;
  };
  selectedPromotionId?: number;
  promotionPrice?: number;
}

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="products-container">
      <header class="page-header">
        <h2>Gestion des Produits</h2>
        <button class="add-btn" (click)="toggleAddForm()">
          Ajouter un produit
        </button>
      </header>

      <!-- Formulaire d'ajout -->
      <div *ngIf="showAddForm" class="form-container">
        <h3>{{ editingProduct ? 'Modifier le produit' : 'Ajouter un produit' }}</h3>
        <form (ngSubmit)="onSubmit()" #productForm="ngForm">
          <div class="form-group">
            <label for="name">Nom du produit*</label>
            <input
              id="name"
              [(ngModel)]="newProduct.name"
              name="name"
              required
              type="text"
              placeholder="Ex: Crème hydratante"
            />
          </div>

          <div class="form-group">
            <label for="description">Description*</label>
            <textarea
              id="description"
              [(ngModel)]="newProduct.description"
              name="description"
              required
              rows="3"
              placeholder="Décrivez le produit..."
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="price">Prix (€)*</label>
              <input
                id="price"
                [(ngModel)]="newProduct.price"
                name="price"
                required
                type="number"
                min="0"
                step="0.01"
              />
            </div>

            <div class="form-group">
              <label for="stock">Stock*</label>
              <input
                id="stock"
                [(ngModel)]="newProduct.stock"
                name="stock"
                required
                type="number"
                min="0"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="typeId">Catégorie*</label>
            <select
              id="typeId"
              name="typeId"
              [(ngModel)]="newProduct.typeId"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              <option *ngFor="let type of types" [value]="type.id_type">
                {{ type.name }}
              </option>
            </select>
          </div>

          <div class="form-actions">
            <button type="submit" class="save-btn" [disabled]="!productForm.valid">
              {{ editingProduct ? 'Mettre à jour' : 'Ajouter' }}
            </button>
            <button type="button" class="cancel-btn" (click)="toggleAddForm()">
              Annuler
            </button>
          </div>
        </form>
      </div>

      <!-- Liste des produits -->
      <div class="products-grid">
        <div *ngFor="let product of products" class="product-card">
          <div class="product-content">
            <h3>{{ product.name }}</h3>
            <p class="description">{{ product.description }}</p>
            <div class="product-info">
              <div class="price-stock">
                <span class="price" [class.original-price]="product.activePromotion">
                  {{ product.price | currency:'EUR' }}
                </span>
                <span *ngIf="product.activePromotion" class="promotion-price">
                  {{ (product.price * (1 - product.activePromotion.discountPercentage / 100)) | currency:'EUR' }}
                </span>
                <span class="stock" [class.low-stock]="product.stock < 5">
                  Stock: {{ product.stock }}
                </span>
              </div>

              <!-- Gestion des promotions -->
              <div class="promotion-controls">
                <select class="promotion-select" [(ngModel)]="product.selectedPromotionId">
                  <option [ngValue]="null">Sélectionner une promotion</option>
                  <option *ngFor="let promo of availablePromotions" [value]="promo.id_promotion">
                    {{ promo.description }} (-{{ promo.discountPercentage }}%)
                  </option>
                </select>
                <button
                  class="promotion-btn apply"
                  (click)="applyPromotion(product, product.selectedPromotionId)"
                  [disabled]="product.selectedPromotionId === undefined || product.selectedPromotionId === null"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>

          <div class="product-actions">
            <button class="edit-btn" (click)="editProduct(product)">
              Modifier
            </button>
            <button class="delete-btn" (click)="deleteProduct(product.id_product)">
              Supprimer
            </button>
          </div>
        </div>
        <div *ngIf="products.length === 0" class="no-data">Aucun produit disponible</div>
      </div>
    </div>
  `,
  styles: [`
    .products-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .add-btn {
      background: #4f46e5;
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .add-btn:hover {
      background: #4338ca;
    }

    .form-container {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      color: #4b5563;
    }

    .form-group input,
    .form-group textarea,
    .form-group select {
      width: 100%;
      padding: 8px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .product-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .product-content {
      margin-bottom: 15px;
    }

    .product-info {
      margin: 15px 0;
    }

    .price-stock {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .original-price {
      text-decoration: line-through;
      color: #6b7280;
    }

    .promotion-price {
      color: #dc2626;
      font-weight: bold;
    }

    .low-stock {
      color: #dc2626;
    }

    .promotion-controls {
      display: flex;
      gap: 8px;
    }

    .promotion-select {
      flex: 1;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .save-btn,
    .cancel-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .save-btn {
      background: #4f46e5;
      color: white;
    }

    .save-btn:disabled {
      background: #d1d5db;
      cursor: not-allowed;
    }

    .cancel-btn {
      background: #dc2626;
      color: white;
    }

    .edit-btn,
    .delete-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .edit-btn {
      background: #4f46e5;
      color: white;
    }

    .delete-btn {
      background: #dc2626;
      color: white;
    }

    .no-data {
      grid-column: 1 / -1;
      text-align: center;
      padding: 40px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .products-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
// Composant de gestion des produits pour l'interface administrateur
export class AdminProductsComponent implements OnInit {
  // Tableau des produits avec leurs promotions associées
  products: ProductWithPromotion[] = [];
  // Liste des promotions disponibles
  availablePromotions: Promotion[] = [];
  // Contrôle l'affichage du formulaire d'ajout
  showAddForm = false;
  // Produit en cours d'édition
  editingProduct: Product | null = null;
  // Liste des catégories de produits
  types: Type[] = [];

  constructor(
    private productService: ProductService, // Service de gestion des produits
    private promotionService: PromotionService, // Service de gestion des promotions
    private notificationService: NotificationService, // Service de notifications
    private typeService: TypeService // Service de gestion des catégories
  ) {}

  // Modèle pour un nouveau produit
  newProduct = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    active: true,
    typeId: 0
  };

  // Initialisation du composant
  ngOnInit() {
    this.loadProducts();
    this.loadPromotions();
    this.loadTypes();
  }

  // Charge les catégories de produits
  loadTypes(): void {
    this.typeService.getTypes().subscribe({
      next: (typesData: Type[]) => {
        this.types = typesData;
      },
      error: () => this.notificationService.error('Erreur lors du chargement des catégories')
    });
  }

  // Bascule l'affichage du formulaire d'ajout/édition
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  // Gère la soumission du formulaire
  onSubmit(): void {
    if (this.editingProduct) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  // Ajoute un nouveau produit
  addProduct(): void {
    // Vérifie si le nom du produit existe déjà
    const productExists = this.products.some(product => product.name.toLowerCase() === this.newProduct.name.toLowerCase());

    if (productExists) {
      this.notificationService.error('Un produit avec ce nom existe déjà');
      return;
    }

    const newProduct: Product = {
      ...this.newProduct,
      id_product: 0,
      imageUrls: []
    };

    this.productService.createProduct(newProduct).subscribe({
      next: () => {
        this.notificationService.success('Produit ajouté avec succès');
        this.loadProducts();
        this.toggleAddForm();
      },
      error: () => this.notificationService.error('Erreur lors de l\'ajout du produit')
    });
  }

  // Met à jour un produit existant
  updateProduct(): void {
    if (!this.editingProduct) return;

    const updatedProduct: Product = {
      ...this.newProduct,
      id_product: this.editingProduct.id_product,
      price: Number(this.newProduct.price),
      stock: Number(this.newProduct.stock),
      typeId: Number(this.newProduct.typeId),
      imageUrls: this.editingProduct.imageUrls || []
    };

    this.productService.updateProduct(this.editingProduct.id_product, updatedProduct).subscribe({
      next: (response) => {
        this.notificationService.success('Produit mis à jour avec succès');
        this.loadProducts();
        this.toggleAddForm();
      },
      error: (error) => {
        this.notificationService.error('Erreur lors de la mise à jour: ' +
          (error.error?.message || 'Une erreur est survenue'));
      }
    });
  }

  // Charge les promotions actives
  loadPromotions() {
    this.promotionService.getActivePromotions().subscribe({
      next: (promotions) => {
        this.availablePromotions = promotions;
      },
      error: (error) => {
        console.error('Erreur chargement promotions:', error);
        this.notificationService.error('Erreur lors du chargement des promotions');
      }
    });
  }

  // Prépare l'édition d'un produit
  editProduct(product: Product): void {
    this.editingProduct = {...product};
    this.newProduct = {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      active: product.active,
      typeId: product.typeId || 0
    };
    this.showAddForm = true;
  }

  // Supprime un produit
  deleteProduct(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.notificationService.success('Produit supprimé');
          this.loadProducts();
        },
        error: () => this.notificationService.error('Erreur lors de la suppression')
      });
    }
  }

  // Charge tous les produits avec leurs promotions
  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products.map(product => {
          const hasActivePromotion = product.promotion && this.isPromotionActive(product.promotion);

          return {
            ...product,
            activePromotion: hasActivePromotion && product.promotion ? {
              id_promotion: product.promotion.id_promotion,
              description: product.promotion.description,
              discountPercentage: product.promotion.discountPercentage,
              startDate: product.promotion.startDate,
              endDate: product.promotion.endDate
            } : undefined,
            selectedPromotionId: hasActivePromotion && product.promotion ?
              product.promotion.id_promotion :
              undefined
          };
        });
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.notificationService.error('Erreur lors du chargement des produits');
      }
    });
  }

  // Vérifie si une promotion est active
  isPromotionActive(promotion: ProductWithPromotion['promotion']): boolean {
    if (!promotion) return false;
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    return now >= startDate && now <= endDate;
  }

  // Applique une promotion à un produit
  applyPromotion(product: ProductWithPromotion, promotionId: number | undefined | null) {
    if (!promotionId) return;

    this.productService.applyPromotion(product.id_product, promotionId).subscribe({
      next: () => {
        const selectedPromotion = this.availablePromotions.find(
          p => p.id_promotion === promotionId
        );

        if (selectedPromotion) {
          product.activePromotion = {
            id_promotion: selectedPromotion.id_promotion,
            description: selectedPromotion.description,
            discountPercentage: selectedPromotion.discountPercentage,
            startDate: selectedPromotion.startDate,
            endDate: selectedPromotion.endDate
          };
          product.promotionPrice = product.price * (1 - selectedPromotion.discountPercentage / 100);
        }

        this.notificationService.success('Promotion appliquée avec succès');
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error applying promotion:', error);
        this.notificationService.error(
          'Erreur lors de l\'application de la promotion: ' +
          (error.error?.message || 'Une erreur est survenue')
        );
        product.selectedPromotionId = undefined;
      }
    });
  }

  // Réinitialise le formulaire
  resetForm(): void {
    this.editingProduct = null;
    this.newProduct = {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      active: true,
      typeId: 0
    };
  }
}