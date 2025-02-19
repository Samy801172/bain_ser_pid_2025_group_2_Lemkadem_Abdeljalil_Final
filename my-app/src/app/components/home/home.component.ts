import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';

import {HomeService} from '../../services/home/home.service';
import {Product, ProductWithPromotion} from '../../models/product/product.model';
import {PromotionTimerComponent} from '../Promotion/promotion-timer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule,PromotionTimerComponent],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <!-- Logo inline SVG pour garantir l'affichage -->
          <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200">
            <!-- Background Pills -->
            <circle cx="80" cy="100" r="60" fill="#e8f4ff"/>

            <!-- Medical Cross -->
            <path d="M60 80 h40 v-40 h40 v40 h40 v40 h-40 v40 h-40 v-40 h-40 z" fill="#4A90E2"/>

            <!-- Company Name -->
            <text x="200" y="115" font-family="Arial" font-size="48" font-weight="bold" fill="#2C3E50">
              GOHAN-MEDIC
            </text>

            <!-- Tagline -->
            <text x="200" y="145" font-family="Arial" font-size="18" fill="#7F8C8D">
              Votre pharmacie en ligne
            </text>

            <!-- DNA Helix Accent -->
            <path d="M180 70 q10 -10 20 0 t20 0 t20 0" stroke="#4A90E2" fill="none" stroke-width="3"/>
            <path d="M180 80 q10 10 20 0 t20 0 t20 0" stroke="#2980B9" fill="none" stroke-width="3"/>
          </svg>

          <h1>Gohan-Medic</h1>
          <p class="tagline">Votre pharmacie en ligne de confiance</p>
          <div class="cta-buttons">
            <a routerLink="/login" class="btn-primary">Se connecter</a>
            <a routerLink="/register" class="btn-secondary">S'inscrire</a>
          </div>
        </div>
      </section>
      <!-- Après la section hero -->

      <section class="promotions">
        <h2>Promotions du Mois</h2>


        <div class="promo-grid">
          @for (promo of activePromotions; track promo.id_product) {
            <div class="promo-card">
              <div class="product-image">
                <img [src]="'assets/' + (promo.imageUrls[0] || 'default-product.jpg')" [alt]="promo.name">

              </div>
              <div class="product-details">
                <h3>{{promo.name}}</h3>
                <p>{{promo.description}}</p>
                <div class="price-container">
                  <span class="original-price">{{promo.price}}€</span>
                  <span class="discounted-price" *ngIf="promo.promotionPrice">
            {{promo.promotionPrice}}€
          </span>
                </div>
                <!-- Sécurisation de l'accès à endDate -->
                @if (promo.activePromotion && promo.activePromotion.endDate) {
                  <app-promotion-timer [endDate]="promo.activePromotion.endDate">
                  </app-promotion-timer>
                }
              </div>
            </div>
          }
        </div>
      </section>

      <section class="new-products">
        <h2>Nouveaux Médicaments</h2>
        <div class="products-grid">
          @for (product of newProducts; track product.id_product) {
            <div class="product-card">
              <div class="product-image">
                <img [src]="'assets/' + getImageFilename(product.name)" [alt]="product.name">
              </div>
              <div class="product-details">
                <h3>{{product.name}}</h3>
                <p>{{product.description}}</p>
                <span class="price">{{product.price}}€</span>
              </div>
            </div>
          }
        </div>
      </section>

    </div>

    <!-- Avantages Section -->
    <section class="features">
      <div class="features-grid">
        <div class="feature-card">
          <div class="icon">💊</div>
          <h3>Médicaments sur Mesure</h3>
          <p>Service de préparation magistrale personnalisée</p>
        </div>
        <div class="feature-card">
          <div class="icon">🚚</div>
          <h3>Livraison Rapide</h3>
          <p>Recevez vos médicaments en toute sécurité</p>
        </div>
        <div class="feature-card">
          <div class="icon">👨‍⚕️</div>
          <h3>Conseils d'Experts</h3>
          <p>Une équipe de pharmaciens à votre écoute</p>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services">
      <h2>Nos Services</h2>
      <div class="service-grid">
        @for (service of services; track service.title) {
          <div class="service-card">
            <img [src]="service.image" [alt]="service.title">
            <h3>{{service.title}}</h3>
            <p>{{service.description}}</p>
          </div>
        }
      </div>
    </section>

    <!-- Nouvelle section pour la fabrication sur mesure -->
    <section class="custom-manufacturing">
      <div class="content">
        <h2>Fabrication sur Mesure</h2>
        <p>Besoin d'un médicament personnalisé ? Notre service de fabrication sur mesure est là pour vous.</p>
        
        <div class="features">
          <div class="feature">
            <i class="fas fa-flask"></i>
            <h3>Préparations Magistrales</h3>
            <p>Médicaments adaptés à vos besoins spécifiques</p>
          </div>
          
          <div class="feature">
            <i class="fas fa-shield-alt"></i>
            <h3>Qualité Garantie</h3>
            <p>Processus rigoureux et contrôles stricts</p>
          </div>
          
          <div class="feature">
            <i class="fas fa-clock"></i>
            <h3>Délais Optimisés</h3>
            <p>Production et livraison rapides</p>
          </div>
        </div>

        <div class="cta">
          <a routerLink="/manufacturing/request" class="cta-button">
            Faire une demande
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>&copy; {{ currentYear }} Gohan-Medic. Tous droits réservés.</p>
    </footer>
  `,
  styles: [`

    .new-products {
      .product-image {
        width: 100%;
        height: 200px;
        overflow: hidden;
        border-radius: 8px;
        margin-bottom: 1rem;
        background-color: #f3f4f6;

        img {
          width:90%;
          height:100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
      }

      .product-card {
        background: white;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: transform 0.2s ease;

        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);

          img {
            transform: scale(1.05);
          }
        }
      }

      .product-details {
        h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        p {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.4;
          margin-bottom: 1rem;
        }

        .price {
          display: block;
          font-size: 1.25rem;
          font-weight: 600;
          color: #4f46e5;
        }
      }
    }
    .home-container {
      min-height: 100vh;
      background: linear-gradient(to bottom, #f3f4f6, #ffffff);
    }
    .countdown-container {
      display: inline-flex;
      align-items: center;
      background: #ef4444;
      color: white;
      padding: 8px 15px;
      border-radius: 4px;
      position: relative;
      margin-top: 1rem;
      width: fit-content;
    }

    .time-unit {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 8px;
      min-width: 40px;
    }

    .time-number {
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 2px;
    }

    .time-label {
      font-size: 0.7rem;
      opacity: 0.9;
    }

    .time-separator {
      opacity: 0.7;
      font-weight: 200;
      margin-top: -8px;
    }

    .promo-badge {
      position: absolute;
      top: -10px;
      right: -10px;
      background: #fbbf24;
      color: #000;
      padding: 2px 6px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: bold;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .hero {
      height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: linear-gradient(to bottom, #ffffff, #f8f9fa);
      padding: 2rem;
    }

    .promo-card {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      position: relative;
      transition: all 0.3s ease;
      border: 1px solid #e5e7eb;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
      }

      .product-details {
        h3 {
          font-size: 1.5rem;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        p {
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }
      }

      .price-container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;

        .original-price {
          text-decoration: line-through;
          color: #9ca3af;
          font-size: 1rem;
        }

        .discounted-price {
          color: #dc2626;
          font-size: 1.75rem;
          font-weight: bold;
        }
      }

      .discount-badge {
        position: absolute;
        top: -12px;
        right: -12px;
        background: #dc2626;
        color: white;
        padding: 0.75rem;
        border-radius: 9999px;
        font-weight: bold;
        font-size: 1.25rem;
        box-shadow: 0 2px 4px rgba(220, 38, 38, 0.3);
      }
    }

    .promotions {
      background: linear-gradient(to bottom, #f3f4f6, white);
      padding: 4rem 2rem;

      h2 {
        text-align: center;
        font-size: 2.5rem;
        color: #1f2937;
        margin-bottom: 3rem;
        font-weight: bold;
      }
    }

    .promo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .promotions, .new-products {
      padding: 4rem;
      background: #f9fafb;
    }

    .promo-grid, .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 2rem auto;
      max-width: 1200px;
    }
    .countdown {
      font-size: 0.9rem;
      color: #4f46e5;
      font-weight: bold;
      margin-top: 0.5rem;
      padding: 0.5rem;
      background: #f3f4f6;
      border-radius: 0.25rem;
    }

    .expired {
      color: #ef4444;
      font-weight: bold;
    }
    .promo-card, .product-card {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: relative;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-4px);
      }
    }

    .discount-badge {
      position: absolute;
      top: -10px;
      right: -10px;
      background: #ef4444;
      color: white;
      padding: 0.5rem;
      border-radius: 9999px;
      font-weight: bold;
    }

    .price-container {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin: 1rem 0;
    }

    .original-price {
      text-decoration: line-through;
      color: #6b7280;
    }

    .discounted-price {
      color: #ef4444;
      font-weight: bold;
      font-size: 1.25rem;
    }

    .promo-dates {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .hero-content {
      max-width: 800px;
    }

    .logo {
      width: auto;
      height: 200px;
      margin-bottom: 2rem;
    }

    h1 {
      font-size: 3.5rem;
      color: #1f2937;
      margin-bottom: 1rem;
      font-weight: bold;
    }

    .tagline {
      font-size: 1.5rem;
      color: #4b5563;
      margin-bottom: 2.5rem;
    }

    .cta-buttons {
      display: flex;
      gap: 1.5rem;
      justify-content: center;

      a {
        padding: 1rem 2.5rem;
        border-radius: 8px;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.3s ease;
      }

      .btn-primary {
        background: #4f46e5;
        color: white;
        &:hover { background: #4338ca; }
      }

      .btn-secondary {
        border: 2px solid #4f46e5;
        color: #4f46e5;
        &:hover {
          background: #4f46e5;
          color: white;
        }
      }
    }

    .features {
      padding: 4rem 2rem;
      background: white;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .feature-card {
      padding: 2rem;
      text-align: center;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        font-size: 1.25rem;
        color: #1f2937;
        margin-bottom: 0.75rem;
      }

      p {
        color: #6b7280;
      }
    }

    .services {
      padding: 4rem 2rem;
      background: #f3f4f6;

      h2 {
        text-align: center;
        font-size: 2.5rem;
        color: #1f2937;
        margin-bottom: 3rem;
      }

      .service-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .service-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }

        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        h3 {
          font-size: 1.25rem;
          color: #1f2937;
          margin: 1rem;
        }

        p {
          color: #6b7280;
          margin: 0 1rem 1rem;
        }
      }
    }

    .footer {
      text-align: center;
      padding: 2rem;
      background: #f9fafb;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .hero {
        height: auto;
        padding: 4rem 1rem;
      }

      .logo {
        height: 150px;
      }

      h1 {
        font-size: 2.5rem;
      }

      .tagline {
        font-size: 1.25rem;
      }

      .cta-buttons {
        flex-direction: column;
        gap: 1rem;
      }

      .features-grid, .service-grid {
        grid-template-columns: 1fr;
      }
    }

    .custom-manufacturing {
      padding: 4rem 2rem;
      background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
      
      .content {
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
      }

      h2 {
        color: #2c3e50;
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
      }

      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin: 3rem 0;
      }

      .feature {
        padding: 2rem;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }

        i {
          font-size: 2.5rem;
          color: #4CAF50;
          margin-bottom: 1rem;
        }

        h3 {
          color: #2c3e50;
          margin-bottom: 1rem;
        }
      }

      .cta-button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-size: 1.1rem;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
          background: #45a049;
          transform: translateY(-2px);
        }

        i {
          transition: transform 0.3s ease;
        }

        &:hover i {
          transform: translateX(5px);
        }
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  currentYear = new Date().getFullYear();
  activePromotions: ProductWithPromotion[] = [];
  newProducts: Product[] = [];

  constructor(
    private homeService: HomeService,
    private router: Router // Ajout du Router
  ) {}

  ngOnInit() {
    this.loadPromotions();
    this.loadNewProducts();
  }

  loadPromotions() {
    this.homeService.getActiveProductPromotions().subscribe({
      next: (promotions: ProductWithPromotion[]) => {
        console.log('Promotions reçues:', promotions);
        this.activePromotions = promotions;
      },
      error: (error) => {
        console.error('Erreur chargement promotions:', error);
      }
    });
  }

  loadNewProducts() {
    this.homeService.getNewProducts().subscribe({
      next: (products) => {
        this.newProducts = products;
      },
      error: (error) => {
        console.error('Erreur chargement nouveaux produits:', error);
      }
    });
  }
  getTimeRemaining(endDate: string) {
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const distance = end - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return {
      days,
      hours,
      expired: distance < 0
    };
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  // Dans la classe HomeComponent, ajoutez cette méthode
  getImageFilename(productName: string): string {
    const name = productName.toLowerCase();
    if (name.includes('paracétamol')) return 'paracetamol.jpg';
    if (name.includes('ibuprofène')) return 'ibuprofene.jpg';
    if (name.includes('amoxicilline')) return 'antibiotique.jpg';
    if (name.includes('vitamine')) return 'vitamine-d.jpg';
    if (name.includes('omega')) return 'omega.jpg';
    return 'default-product.jpg';
  }
  getDefaultEndDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 15); // Promotion par défaut de 15 jours
    return date;
  }

  services = [
    {
      title: 'Médicaments sur Ordonnance',
      description: 'Service sécurisé de traitement des prescriptions',
      image: 'assets/prescription.jpg'
    },
    {
      title: 'Préparations Magistrales',
      description: 'Médicaments personnalisés selon vos besoins',
      image: 'assets/custom-med.jpg'
    },
    {
      title: 'Parapharmacie',
      description: 'Large gamme de produits de santé et bien-être',
      image: 'assets/parapharmacie.jpg'
    },
    {
      title: 'Conseil Pharmaceutique',
      description: 'Consultations en ligne avec nos pharmaciens',
      image: 'assets/conseil.jpg'
    },
    {
      title: 'Service d\'Urgence',
      description: 'Disponibilité 24/7 pour vos besoins urgents',
      image: 'assets/urgence.jpg'
    },
    {
      title: 'Suivi de Traitement',
      description: 'Accompagnement personnalisé de votre santé',
      image: 'assets/suivi.jpg'
    }
  ];
}

