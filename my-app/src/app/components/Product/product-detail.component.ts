// components/Product/product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import {Product, ProductWithPromotion} from '../../models/product/product.model';
import {ProductService} from '../../services/product/product.service';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (product) {
      <div class="product-detail">
        <div class="product-card">
          <div class="product-header">
            <h1>{{ product.name }}</h1>
          </div>

          <div class="product-image">
            <img [src]="product.imageUrls[0] || '/assets/placeholder.jpg'" [alt]="product.name">
          </div>

          <div class="product-content">
            <p class="description">{{ product.description }}</p>

            <div class="price-section">
              <p class="price" [class.promoted]="product.activePromotion">
                @if (product.activePromotion) {
                  <span class="original-price">
                {{ product.price | currency:'EUR' }}
              </span>
                  <span class="promotion-price">
                {{ product.promotionPrice | currency:'EUR' }}
              </span>
                } @else {
                  <span class="current-price">
                {{ product.price | currency:'EUR' }}
              </span>
                }
              </p>
            </div>
            <p class="stock" [class.low-stock]="product.stock < 5">
              Stock disponible: {{ product.stock }}
            </p>
          </div>

          <div class="product-actions">
            <button
              class="add-cart-btn"
              (click)="addToCart(product)"
              [disabled]="product.stock === 0"
            >
              @if (product.stock === 0) {
                Rupture de stock
              } @else {
                Ajouter au panier
              }
            </button>
            <button class="back-btn" routerLink="/client/products">
              Retour aux produits
            </button>
          </div>
        </div>
      </div>
    } @else {
      <div class="loading-state">
        Chargement du produit...
      </div>
    }
  `,
  styles: [`
    .product-detail {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .product-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .product-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;

      h1 {
        margin: 0;
        color: #1a1a1a;
        font-size: 1.5rem;
      }
    }

    .product-image {
      width: 100%;
      height: 400px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .product-content {
      padding: 1.5rem;

      .description {
        color: #4b5563;
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }
    }

    .price-section {
      margin: 1.5rem 0;

      .price {
        font-size: 1.5rem;
        font-weight: 600;

        &.promoted {
          .original-price {
            text-decoration: line-through;
            color: #9ca3af;
            font-size: 1.125rem;
            margin-right: 0.5rem;
          }

          .promotion-price {
            color: #dc2626;
          }
        }

        .current-price {
          color: #2196F3;
        }
      }
    }

    .stock {
      font-size: 0.875rem;
      color: #4b5563;

      &.low-stock {
        color: #dc2626;
      }
    }

    .product-actions {
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
      border-top: 1px solid #e5e7eb;

      button {
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;

        &.add-cart-btn {
          flex: 1;
          background: #2196F3;
          color: white;
          border: none;

          &:hover:not(:disabled) {
            background: #1976D2;
          }

          &:disabled {
            background: #9ca3af;
            cursor: not-allowed;
          }
        }

        &.back-btn {
          background: white;
          border: 1px solid #d1d5db;
          color: #4b5563;

          &:hover {
            background: #f9fafb;
          }
        }
      }
    }

    .loading-state {
      text-align: center;
      padding: 3rem;
      color: #6b7280;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product?: ProductWithPromotion;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  private notificationService: NotificationService  // Ajout du service
  ) {}
  // Vérification de sécurité si nécessaire
  hasActivePromotion(): boolean {
    return !!this.product && !!this.product.activePromotion;
  }

  getPromotionalPrice(): number | undefined {
    return this.product?.promotionPrice;
  }
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProduct(id);
    }
  }

  private loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (products) => {
        this.product = products|| null;
      },
      error: (error: Error) => {
        console.error('Erreur lors du chargement du produit:', error);
      }
    });
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product, 1).subscribe({
      next: () => {
        this.notificationService.success('Produit ajouté au panier');
      },
      error: (error) => {
        this.notificationService.error('Erreur lors de l\'ajout au panier');
        console.error('Error:', error);
      }
    });
  }
}
