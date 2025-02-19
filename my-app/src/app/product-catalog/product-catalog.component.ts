// components/product-catalog/product-catalog.component.ts
import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product/product.service';
import {Product} from '../models/product/product.model';
import {Type} from '../models/type/type.model';
import {TypeService} from '../services/type/type.service';
import {CartService} from '../services';
import {NotificationService} from '../services/notification/notification.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <!-- Filtres -->
      <div class="filters mb-6 bg-white p-4 rounded shadow">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="filter-group">
            <select (change)="filterByType($event)" class="w-full p-2 border rounded">
              <option value="">Toutes les catégories</option>
              @for (type of types; track type.id_type) {
                <option [value]="type.id_type">{{ type.name }}</option>
              }
            </select>
          </div>
        </div>
      </div>

      <!-- Grille de produits -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        @for (product of products; track product.id_product) {
          <div class="product-card bg-white rounded-lg shadow overflow-hidden">
            <img
              [src]="product.imageUrls?.[0] || 'assets/placeholder.jpg'"
              [alt]="product.name"
              class="w-full h-48 object-cover"
            >

            <div class="p-4">
              <h3 class="font-bold text-lg">{{ product.name }}</h3>
              <p class="text-gray-600 text-sm mb-2">{{ product.description }}</p>

              <div class="flex justify-between items-center mb-3">
                <span class="font-bold text-lg">{{ product.price | currency:'EUR' }}</span>
                <span class="text-sm text-gray-500">
                  Stock: {{ product.stock }}
                </span>
              </div>

              <button
                (click)="addToCart(product)"
                class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                [disabled]="product.stock === 0"
              >
                {{ product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier' }}
              </button>
            </div>
          </div>
        }

        @if (products.length === 0) {
          <div class="col-span-full text-center py-8">
            <p class="text-gray-500">Aucun produit disponible</p>
          </div>
        }
      </div>
    </div>
  `
})
export class ProductCatalogComponent implements OnInit {
  products: Product[] = [];
  types: Type[] = [];
  selectedTypeId: number | null = null;

  constructor(
    private productService: ProductService,
    private typeService: TypeService,
    private cartService: CartService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadTypes();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: () => {
        this.notificationService.error('Erreur lors du chargement des produits');
      }
    });
  }

  loadTypes() {
    this.typeService.getTypes().subscribe({
      next: (types) => {
        this.types = types;
      }
    });
  }

  filterByType(event: any) {
    const typeId = event.target.value;
    if (typeId) {
      this.productService.getAllProducts()
        .pipe(
          map(products => products.filter(p => p.typeId === +typeId))
        )
        .subscribe(products => this.products = products);
    } else {
      this.loadProducts();
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id_product, 1).subscribe({
      next: () => {
        this.notificationService.success('Produit ajouté au panier');
      },
      error: () => {
        this.notificationService.error('Erreur lors de l\'ajout au panier');
      }
    });
  }
}
