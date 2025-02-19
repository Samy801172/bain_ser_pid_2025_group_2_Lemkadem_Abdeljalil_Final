// src/app/services/home/home.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs'; // Import des modules nécessaires
import { Product, ProductWithPromotion } from '../../models/product/product.model'; // Import des modèles produits
import { environment } from '../../../environments/environment'; // Import de l'environnement (non utilisé ici, mais prêt pour une utilisation future)
import { TimerService } from '../timer/timer.service'; // Import du service TimerService

@Injectable({
  providedIn: 'root' // Permet à ce service d'être injecté dans toute l'application
})
export class HomeService {
  // Liste des produits en promotion (données mock)
  private mockPromotions: ProductWithPromotion[] = [
    {
      id_product: 1,
      name: 'Ibuprofène 400mg',
      description: 'Anti-inflammatoire non stéroïdien utilisé pour réduire la douleur, la fièvre et l\'inflammation',
      price: 7.99,
      stock: 94,
      typeId: 1,
      active: true,
      imageUrls: ['ibuprofene.jpg'],
      activePromotion: {
        id_promotion: 1,
        description: 'Promotion de printemps sur les anti-inflammatoires',
        discountPercentage: 20,
        startDate: new Date(), // Début de la promotion
        endDate: new Date(new Date().setDate(new Date().getDate() + 15)) // Fin de la promotion dans 15 jours
      },
      promotionPrice: 6.39 // Prix après promotion
    },
    {
      id_product: 2,
      name: 'Paracétamol 500mg',
      description: 'Antalgique et antipyrétique pour le soulagement des douleurs légères à modérées',
      price: 4.99,
      stock: 150,
      typeId: 1,
      active: true,
      imageUrls: ['paracetamol.jpg'],
      activePromotion: {
        id_promotion: 2,
        description: 'Offre spéciale antidouleurs',
        discountPercentage: 20,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 15))
      },
      promotionPrice: 3.99
    },
    {
      id_product: 3,
      name: 'Amoxicilline 500mg',
      description: 'Antibiotique utilisé pour traiter diverses infections bactériennes',
      price: 15.99,
      stock: 89,
      typeId: 2,
      active: true,
      imageUrls: ['antibiotique.jpg'],
      activePromotion: {
        id_promotion: 3,
        description: 'Réduction sur les antibiotiques',
        discountPercentage: 20,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 15))
      },
      promotionPrice: 12.79
    }
  ];

  // Injection des services nécessaires
  constructor(
    private http: HttpClient,
    private timerService: TimerService // Service de gestion du temps (non utilisé ici)
  ) {}

  // Méthode pour obtenir les promotions actives sur les produits
  getActiveProductPromotions(): Observable<ProductWithPromotion[]> {
    return of(this.mockPromotions).pipe(
      map((promotions) => {
        console.log('Promotions avec dates:', promotions); // Affichage des promotions dans la console pour débogage
        return promotions; // Retourne les promotions sous forme d'observable
      })
    );
  }

  // Méthode pour obtenir les nouveaux produits
  getNewProducts(): Observable<Product[]> {
    // Liste des nouveaux produits (données mock)
    const mockNewProducts: Product[] = [
      {
        id_product: 4,
        name: 'Vitamine D3',
        description: 'Complément alimentaire essentiel pour la santé des os',
        price: 12.99,
        stock: 200,
        typeId: 4,
        active: true,
        imageUrls: ['vitamine-d.jpg']
      },
      {
        id_product: 5,
        name: 'Omega 3',
        description: 'Acides gras essentiels pour la santé cardiovasculaire',
        price: 15.99,
        stock: 150,
        typeId: 4,
        active: true,
        imageUrls: ['omega3.jpg']
      }
    ];

    return of(mockNewProducts).pipe(
      map((products) => {
        console.log('Nouveaux produits:', products); // Affichage des nouveaux produits dans la console pour débogage
        return products; // Retourne les produits sous forme d'observable
      })
    );
  }
}
