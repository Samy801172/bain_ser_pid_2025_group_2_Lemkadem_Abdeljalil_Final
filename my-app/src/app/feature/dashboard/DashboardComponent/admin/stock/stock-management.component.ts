// Importation des modules nécessaires d'Angular et des fichiers liés.
import { Component, OnInit } from '@angular/core'; // Décorateur Component et interface OnInit pour le cycle de vie Angular.
import { CommonModule } from '@angular/common'; // Module commun pour les fonctionnalités Angular standards.
import { StockService } from '../../../../../services/stock/stock.service'; // Service personnalisé pour gérer les appels relatifs au stock.
import { Product } from '../../../../../models/product/product.model'; // Modèle représentant un produit.

// Déclaration du composant Angular avec son sélecteur, ses dépendances et son template.
@Component({
  selector: 'app-stock-management', // Nom utilisé pour insérer ce composant dans un template HTML.
  standalone: true, // Composant autonome, sans inclusion dans un module Angular parent.
  imports: [CommonModule], // Modules nécessaires pour ce composant.
  template: `
    <div class="container">
      <h2>Gestion des Stocks</h2>

      <!-- Bouton pour exporter les stocks sous format CSV -->
      <button class="export-btn" (click)="exportStock()">
        <i class="fas fa-download"></i> Exporter le Stock (CSV)
      </button>

      <h3>État du Stock</h3>
      <div class="stock-grid">
        <!-- Boucle pour afficher les produits sous forme de cartes -->
        <!-- Utilisation incorrecte ici d'un '@for', qui devrait être '*ngFor' -->
        @for (product of products; track product.id_product) {
          <div class="stock-card" [class.low-stock]="product.stock < 5">
            <div class="product-header">
              <h4>{{product.name}}</h4>
              <!-- Affichage d'un badge si le stock est faible -->
              @if (product.stock < 5) {
                <span class="stock-badge warning">Stock Faible</span>
              }
            </div>
            <div class="stock-info">
              <div class="stock-count">
                Stock : <strong>{{product.stock}}</strong>
              </div>
              <div class="price">{{product.price | currency:'EUR'}}</div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    /* Conteneur principal */
    .container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Bouton d'exportation */
    .export-btn {
      background: #4f46e5; /* Couleur de fond */
      color: white; /* Couleur du texte */
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      margin-bottom: 2rem;
      transition: background-color 0.2s; /* Animation pour changement de couleur */
    }

    /* Grille des cartes de stock */
    .stock-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    /* Carte représentant un produit */
    .stock-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);

      /* Mise en surbrillance si le stock est faible */
      &.low-stock {
        border-left: 4px solid #dc2626;
      }
    }

    /* En-tête du produit */
    .product-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      h4 {
        margin: 0;
        font-size: 1.1rem;
      }
    }

    /* Badge indiquant un stock faible */
    .stock-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;

      &.warning {
        background: #fef2f2; /* Couleur d'arrière-plan */
        color: #dc2626; /* Couleur du texte */
      }
    }

    /* Informations sur le produit */
    .stock-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }

    /* Prix du produit */
    .price {
      font-size: 1.25rem;
      font-weight: 600;
      color: #4f46e5;
    }
  `]
})
export class StockManagementComponent implements OnInit {
  products: Product[] = []; // Tableau pour stocker les produits.
  stockAlerts: any[] = []; // Tableau pour stocker les alertes de stock.

  // Injection du service StockService dans le constructeur.
  constructor(private stockService: StockService) {}

  // Méthode du cycle de vie Angular appelée à l'initialisation du composant.
  ngOnInit() {
    this.loadProducts(); // Charge les produits depuis le service.
    this.loadStockAlerts(); // Charge les alertes de stock depuis le service.
  }

  // Récupère la liste des produits depuis l'API.
  loadProducts() {
    this.stockService.getProducts().subscribe({
      next: (data) => this.products = data, // Met à jour le tableau de produits.
      error: (err) => console.error('Erreur chargement produits:', err) // Gère les erreurs.
    });
  }

  // Récupère les alertes de stock depuis l'API.
  loadStockAlerts() {
    this.stockService.getStockAlerts().subscribe({
      next: (data) => this.stockAlerts = data, // Met à jour les alertes de stock.
      error: (err) => console.error('Erreur chargement alertes:', err) // Gère les erreurs.
    });
  }

  // Exporte les données de stock sous forme de fichier CSV.
  exportStock() {
    this.stockService.downloadStockCsv().subscribe({
      next: (blob) => {
        // Crée une URL temporaire pour télécharger le fichier.
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'stock.csv'; // Nom du fichier téléchargé.
        link.click(); // Simule un clic pour lancer le téléchargement.
        window.URL.revokeObjectURL(url); // Nettoie l'URL temporaire.
      },
      error: (err) => console.error('Erreur export:', err) // Gère les erreurs.
    });
  }
}
