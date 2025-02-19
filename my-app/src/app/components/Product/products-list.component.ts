import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartService} from '../../services';
import {Product} from '../../models/product/product.model';
import {ProductService} from '../../services/product/product.service';
import {NotificationService} from '../../services/notification/notification.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">Nos Produits</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        @for (product of products; track product.id_product) {
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <!-- Image du produit -->
            <div class="aspect-w-1 aspect-h-1">
              <img
                [src]="product.imageUrls?.[0] || 'assets/placeholder.jpg'"
                [alt]="product.name"
                class="w-full h-48 object-cover"
              >
            </div>

            <!-- Informations produit -->
            <div class="p-4">
              <h3 class="text-lg font-semibold">{{ product.name }}</h3>
              <p class="text-gray-600 text-sm mt-1">{{ product.description }}</p>

              <!-- Prix et stock -->
              <div class="mt-4 flex justify-between items-center">
                <div>
                  <span class="text-xl font-bold">{{ product.price | currency:'EUR' }}</span>
                  @if (product.promotionPrice) {
                    <span class="ml-2 text-red-600 text-sm">
                      -{{ calculateDiscount(product) }}%
                    </span>
                  }
                </div>
                <span class="text-sm" [class.text-red-600]="product.stock < 5">
                  {{ product.stock }} en stock
                </span>
              </div>

              <!-- Bouton d'ajout au panier -->
              <button
                (click)="addToCart(product)"
                class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md
                       hover:bg-blue-700 transition duration-200
                       disabled:bg-gray-400 disabled:cursor-not-allowed"
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
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        console.log('Produits chargés:', products); // Debug
        this.products = products;
      },
      error: (error) => {
        console.error('Erreur chargement produits:', error); // Debug
        this.notificationService.error('Erreur lors du chargement des produits');
      }
    });
  }

  addToCart(product: Product) {
    if (product.stock > 0) {
      this.cartService.addToCart(product.id_product, 1).subscribe({
        next: () => this.notificationService.success('Produit ajouté au panier'),
        error: () => this.notificationService.error('Erreur lors de l\'ajout au panier')
      });
    }
  }

  calculateDiscount(product: Product): number {
    if (product.price && product.promotionPrice) {
      return Math.round((1 - product.promotionPrice / product.price) * 100);
    }
    return 0;
  }
}
