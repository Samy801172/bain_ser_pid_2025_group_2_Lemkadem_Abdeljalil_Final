import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {Product, ProductWithPromotion} from '../../../../../models/product/product.model';
import { ProductService } from '../../../../../services/product/product.service';
import { CartService } from '../../../../../services';
import { NotificationService } from '../../../../../services/notification/notification.service';
import {FormsModule} from '@angular/forms';
import {take} from 'rxjs';
import {PromotionService} from '../../../../../services/promotion/promotion.service';
import {PromotionTimerComponent} from '../../../../../components/Promotion/promotion-timer.component';


// Définition de l'interface pour un type de produit
export interface Type {
  id_type: number;  // Identifiant du type
  name: string;  // Nom du type
  description: string;  // Description du type
  icon: string;  // Icône associée au type
  prescription_required: boolean;  // Si une prescription est requise pour ce type
  products?: Product[];  // Liste des produits associés (facultatif)
}
@Component({
  selector: 'app-client-products',  // Sélecteur du composant
  standalone: true,  // Indique que ce composant est autonome
  imports: [CommonModule, RouterModule, FormsModule, PromotionTimerComponent],  // Importation des modules nécessaires
  template: `
    <div class="products-container">
      <header class="page-header">
        <h2>Nos Produits</h2>

        <div class="filter-container">
          <select
            [(ngModel)]="selectedType"
            (change)="filterProducts()"
            class="type-filter"
          >
            <option *ngFor="let type of typeOptions" [value]="type.value">
              {{ type.label }}
            </option>
          </select>

          <select
            [(ngModel)]="sortOrder"
            (change)="sortProducts()"
            class="price-filter"
          >
            <option value="default">Tri par défaut</option>
            <option value="prixCroissant">Prix croissant</option>
            <option value="prixDecroissant">Prix décroissant</option>
            <option value="promotion">Promotions d'abord</option>
          </select>
        </div>
      </header>

      <div class="products-grid">
        @for (product of products; track product.id_product) {
          <div class="product-card">
            <div class="product-image">
              <img [src]="'assets/' + getImageFilename(product.name)" [alt]="product.name">
              @if (product.activePromotion) {
                <div class="promo-container">

                  <app-promotion-timer [endDate]="product.activePromotion.endDate">
                  </app-promotion-timer>
                </div>
              }

              @if (product.stock < 5 && product.stock > 0) {
                <div class="stock-badge">Stock limité</div>
              }
            </div>

            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="description">{{ product.description }}</p>

              <div class="product-details">
                <div class="price-container">
                  @if (product.activePromotion) {
                    <div class="prices">
                      <span class="original-price">{{ product.price | currency:'EUR' }}</span>
                      <span class="promo-price">{{ product.promotionPrice | currency:'EUR' }}</span>
                    </div>
                  } @else {
                    <span class="price">{{ product.price | currency:'EUR' }}</span>
                  }
                </div>

                <div class="stock-info">
                  <span class="stock" [class.low-stock]="product.stock < 5">
                    Stock: {{ product.stock }}
                  </span>
                </div>
              </div>

              <button
                class="add-to-cart-btn"
                [disabled]="!isProductAvailable(product)"
                (click)="addToCart(product)"
              >
                {{ !isProductAvailable(product) ? 'Rupture de stock' : 'Ajouter au panier' }}
              </button>
            </div>
          </div>
        }
      </div>
    </div>

  `,
  styles: [`
    // Container principal
    .products-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .prices {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .original-price {
      text-decoration: line-through;
      color: #6b7280;
      font-size: 0.9em;
    }

    .promo-price {
      color: #dc2626;
      font-weight: bold;
      font-size: 1.25rem;
    }
    .price-container {
      .prices {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .original-price {
          text-decoration: line-through;
          color: #6b7280;
          font-size: 0.9rem;
        }

        .promo-price {
          color: #dc2626;
          font-weight: bold;
          font-size: 1.25rem;
        }

        .promo-badge {
          background: #dc2626;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          display: inline-block;
        }
      }

      .price {
        font-size: 1.25rem;
        font-weight: 600;
        color: #4f46e5;
      }
    }
    .promo-label {
      background: #dc2626;
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: bold;
      display: inline-block;
      margin-top: 0.25rem;
    }

    // En-tête avec filtres
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    // Container pour les filtres
    .filter-container {
      display: flex;
      gap: 1rem;
    }
    .promo-container {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: flex-end;
    }

    .promo-duration {
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.75rem;

      &.ending-soon {
        background: #f59e0b;
        font-weight: bold;
      }

      &.last-day {
        background: #dc2626;
        font-weight: bold;
        animation: pulse 2s infinite;
      }
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.6; }
      100% { opacity: 1; }
    }
    // Style commun pour les selects
    .type-filter, .price-filter {
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
      background-color: white;
      font-size: 0.95rem;
      cursor: pointer;
      min-width: 200px;

      &:focus {
        outline: none;
        border-color: #4f46e5;
        box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
      }
    }

    // Grille de produits
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    // Carte produit
    .product-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
    }

    // Zone image produit
    .product-image {
      position: relative;
      width: 100%;
      height: 200px;
      overflow: hidden;
      background-color: #f3f4f6;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }

    // Badges
    .promo-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #dc2626;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: bold;
    }

    .stock-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: #fef3c7;
      color: #92400e;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.875rem;
    }

    // Informations produit
    .product-info {
      padding: 1rem;

      h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .description {
        color: #6b7280;
        font-size: 0.875rem;
        line-height: 1.4;
      }
    }

    // Prix et promotions
    .price-container {
      display: flex;
      flex-direction: column;
    }

    .original-price {
      text-decoration: line-through;
      color: #6b7280;
      font-size: 0.9em;
    }

    .promo-price {
      color: #dc2626;
      font-weight: bold;
      font-size: 1.25rem;
    }

    .price {
      font-size: 1.25rem;
      font-weight: 600;
      color: #4f46e5;
    }

    // Stock
    .stock {
      font-size: 0.875rem;
      &.low-stock {
        color: #dc2626;
      }
    }

    // Bouton ajouter au panier
    .add-to-cart-btn {
      width: 100%;
      background: #4f46e5;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 4px;
      margin-top: 10px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;

      &:hover:not(:disabled) {
        background: #4338ca;
      }

      &:disabled {
        background: #9ca3af;
        cursor: not-allowed;
      }
    }

    .product-details {
      margin: 1rem 0;
    }

    .prices {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .original-price {
      text-decoration: line-through;
      color: #6b7280;
      font-size: 0.9em;
    }

    .promo-price {
      color: #dc2626;
      font-weight: bold;
      font-size: 1.25rem;
    }

    .price-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
  `]
})
export class ClientProductsComponent implements OnInit {
  products: ProductWithPromotion[] = [];  // Liste des produits affichés
  allProducts: ProductWithPromotion[] = [];  // Liste complète de tous les produits
  // Déclaration des variables pour gérer le filtrage et le tri des produits
selectedType: string = 'tous';  // Définit le type de produit sélectionné (par défaut 'tous')
sortOrder: string = 'default';  // Définit l'ordre de tri des produits (par défaut 'default')

// Liste des options de filtrage des produits (par type et promotions)
typeOptions = [
  {value: 'tous', label: 'Tous les produits'},  // Option pour afficher tous les produits
  {value: 'promos', label: 'En promotion'},  // Option pour afficher les produits en promotion
  {value: '1', label: 'Médicaments sans ordonnance'},  // Option pour filtrer les médicaments sans ordonnance
  {value: '2', label: 'Médicaments sur ordonnance'},  // Option pour filtrer les médicaments sur ordonnance
  {value: '3', label: 'Matériel médical'},  // Option pour filtrer le matériel médical
  {value: '4', label: 'Compléments alimentaires'},  // Option pour filtrer les compléments alimentaires
  {value: '5', label: 'Hygiène et soins'},  // Option pour filtrer les produits d'hygiène et de soins
  {value: '6', label: 'Premiers secours'},  // Option pour filtrer les produits de premiers secours
  {value: '7', label: 'Préparations magistrales'},  // Option pour filtrer les préparations magistrales
  {value: '8', label: 'Orthopédie'},  // Option pour filtrer les produits d'orthopédie
  {value: '9', label: 'Maternité et bébé'},  // Option pour filtrer les produits de maternité et bébé
  {value: '10', label: 'Maintien à domicile'}  // Option pour filtrer les produits pour maintien à domicile
];

// Constructeur du composant avec injection des services nécessaires
constructor(
  private productService: ProductService,  // Service pour gérer les produits
  private cartService: CartService,  // Service pour gérer le panier
  private notificationService: NotificationService  // Service pour gérer les notifications
) {}

// Méthode exécutée au moment de l'initialisation du composant
ngOnInit(): void {
  this.loadProducts();  // Charge les produits disponibles
}

// Méthode pour filtrer les produits en fonction du type sélectionné
filterProducts(): void {
  if (this.selectedType === 'tous') {
    this.products = [...this.allProducts];  // Affiche tous les produits
  } else if (this.selectedType === 'promos') {
    this.products = this.allProducts.filter(product => product.activePromotion);  // Affiche uniquement les produits en promotion
  } else {
    const selectedTypeId = parseInt(this.selectedType);  // Convertit la sélection en ID numérique
    this.products = this.allProducts.filter(product => product.typeId === selectedTypeId);  // Filtre selon le type sélectionné
  }
  this.sortProducts();  // Applique le tri après le filtrage
}

// Méthode pour trier les produits selon l'ordre sélectionné
sortProducts(): void {
  this.products.sort((a, b) => {
    const priceA = a.activePromotion ? this.getDiscountedPrice(a) : a.price;  // Applique une réduction si le produit a une promotion
    const priceB = b.activePromotion ? this.getDiscountedPrice(b) : b.price;

    switch (this.sortOrder) {
      case 'prixCroissant':  // Tri par prix croissant
        return priceA - priceB;
      case 'prixDecroissant':  // Tri par prix décroissant
        return priceB - priceA;
      case 'promotion':  // Trie les produits avec promotion en priorité
        return (b.activePromotion ? 1 : 0) - (a.activePromotion ? 1 : 0);
      default:  // Aucun tri particulier
        return 0;
    }
  });
}

// Méthode pour déterminer le nom de fichier de l'image en fonction du nom du produit
getImageFilename(productName: string): string {
  const name = productName.toLowerCase();  // Convertit le nom du produit en minuscules pour la comparaison
  // Retourne le nom de l'image en fonction du nom du produit
  if (name.includes('paracétamol')) return 'paracetamol.jpg';
  if (name.includes('ibuprofène')) return 'ibuprofene.jpg';
  if (name.includes('antibiotique')) return 'antibiotique.jpg';
  if (name.includes('crème main')) return 'crèmemain.jpg';
  if (name.includes('vitamine')) return 'vitamine-d.jpg';
  if (name.includes('omega')) return 'omega.jpg';
  return 'default-product.jpg';  // Image par défaut si aucune correspondance
}

// Vérifie la disponibilité d'un produit (en stock ou non)
isProductAvailable(product: Product): boolean {
  return product.stock > 0;  // Retourne true si le produit est disponible en stock
}

// Méthode pour ajouter un produit au panier
addToCart(product: ProductWithPromotion): void {
  const clientId = localStorage.getItem('clientId');  // Récupère l'ID du client depuis localStorage
  if (!clientId) {
    this.notificationService.error('Veuillez vous connecter pour ajouter au panier');  // Message d'erreur si le client n'est pas connecté
    return;
  }

  if (!this.isProductAvailable(product)) {
    this.notificationService.error('Ce produit est en rupture de stock');  // Message d'erreur si le produit est en rupture de stock
    return;
  }

  // Vérifie si le produit est déjà dans le panier et si la quantité maximale est atteinte
  this.cartService.getCartItems().pipe(take(1)).subscribe(items => {
    const cartItem = items.find(item => item.product.id_product === product.id_product);
    if (cartItem && cartItem.quantity >= product.stock) {
      this.notificationService.error('Stock maximum atteint pour ce produit');  // Message d'erreur si le stock maximum est atteint
      return;
    }

    // Calcule le prix final (applique la réduction si une promotion est active)
    const finalPrice = product.activePromotion ? this.getDiscountedPrice(product) : product.price;
    this.cartService.addToCart(product.id_product, 1).subscribe({
      next: () => {
        this.notificationService.success('Produit ajouté au panier');  // Message de succès après ajout au panier
        this.loadProducts();  // Recharge la liste des produits après l'ajout
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout au panier:', error);
        this.notificationService.error('Erreur lors de l\'ajout au panier');  // Message d'erreur en cas de problème
      }
    });
  });
}

// Méthode pour charger tous les produits depuis le service
loadProducts(): void {
  this.productService.getAllProducts().subscribe({
    next: (products) => {
      console.log('Products received in component:', products);
      this.allProducts = products;  // Stocke tous les produits récupérés
      this.products = [...this.allProducts];  // Crée une copie des produits pour afficher
      this.filterProducts();  // Applique les filtres et le tri sur les produits chargés
    },
    error: (error) => {
      console.error('Error loading products:', error);
      this.notificationService.error('Erreur lors du chargement des produits');  // Message d'erreur si le chargement échoue
    }
  });
}

// Méthode pour formater la date de fin d'une promotion
getEndDateFormatted(promotion: any): string {
  if (!promotion || !promotion.endDate) {
    return '';  // Retourne une chaîne vide si la promotion n'a pas de date de fin
  }

  const endDate = new Date(promotion.endDate);  // Convertit la date de fin en objet Date
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  return endDate.toLocaleDateString('fr-FR', options);  // Retourne la date formatée au format français
}

// Méthode pour obtenir le statut d'une promotion
getPromotionStatus(promotion: any): { type: 'normal' | 'ending-soon' | 'last-day', message: string } {
  if (!promotion || !this.isPromotionActive(promotion)) {
    return {type: 'normal', message: ''};  // Retourne un statut normal si la promotion n'est pas active
  }

  const now = new Date();  // Récupère la date actuelle
  const endDate = new Date(promotion.endDate);  // Récupère la date de fin de la promotion
  const diffDays = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));  // Calcule la différence en jours

  if (diffDays <= 1) {
    return {
      type: 'last-day',  // Si la promotion se termine dans la journée, retour "Dernier jour"
      message: 'Dernier jour !'
    };
  }

  if (diffDays <= 3) {
    return {
      type: 'ending-soon',  // Si la promotion se termine dans 3 jours ou moins, retour "Plus que X jours !"
      message: `Plus que ${diffDays} jours !`
    };
  }

  return {
    type: 'normal',  // Si la promotion dure encore longtemps, affiche la date de fin
    message: `Jusqu'au ${this.getEndDateFormatted(promotion)}`
  };
}

// Vérifie si une promotion est encore active
isPromotionActive(promotion: any): boolean {
  if (!promotion) return false;  // Si la promotion est absente, retourne false
  const now = new Date();  // Récupère la date actuelle
  const startDate = new Date(promotion.startDate);  // Récupère la date de début de la promotion
  const endDate = new Date(promotion.endDate);  // Récupère la date de fin de la promotion
  return now >= startDate && now <= endDate;  // Retourne true si la date actuelle est dans la période de promotion
}

// Calcule le prix après application de la réduction d'une promotion
getDiscountedPrice(product: ProductWithPromotion): number {
  if (product.activePromotion && this.isPromotionActive(product.activePromotion)) {
    const discountAmount = product.price * (product.activePromotion.discountPercentage / 100);  // Calcule le montant de la réduction
    return Number((product.price - discountAmount).toFixed(2));  // Retourne le prix après réduction
  }
  return product.price; }}