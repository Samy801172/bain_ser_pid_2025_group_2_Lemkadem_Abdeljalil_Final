// src/app/feature/Client/Dashboard/ClientServicesComponent/client-services.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientServiceService } from 'app/feature/Dashboard/DashboardComponent/client/services/client-service.component';
import { NotificationService } from '../../../../../services/notification/notification.service';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;  // durée en minutes
}

@Component({
  selector: 'app-client-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="client-services-container">
      <header class="page-header">
        <h2>Nos Services</h2>
      </header>

      <div *ngIf="loading" class="loading">Chargement des services...</div>

      <div *ngIf="error" class="error">{{ error }}</div>

      <div class="services-grid" *ngIf="!loading && !error">
        <div *ngIf="services.length === 0" class="no-data">Aucun service disponible pour le moment.</div>
        <div *ngFor="let service of services" class="service-card">
          <div class="service-content">
            <h3>{{service.name}}</h3>
            <p class="description">{{service.description}}</p>
            <div class="service-details">
              <span class="price">{{service.price | currency:'EUR'}}</span>
              <span class="duration">{{formatDuration(service.duration)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .client-services-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .page-header {
        margin-bottom: 20px;
        h2 {
          color: #333;
          margin: 0;
        }
      }

      .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }

      .service-card {
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .service-content {
          h3 {
            margin: 0 0 10px 0;
            color: #333;
            font-size: 1.2em;
          }

          .description {
            color: #6b7280;
            margin: 10px 0;
            line-height: 1.5;
          }

          .service-details {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;

            .price {
              color: #4f46e5;
              font-weight: 600;
              font-size: 1.1em;
            }

            .duration {
              color: #6b7280;
              font-size: 0.9em;
            }
          }
        }
      }

      .loading {
        text-align: center;
        color: #333;
      }

      .error {
        color: #b91c1c;
        text-align: center;
      }

      .no-data {
        text-align: center;
        color: #666;
        background: white;
        border-radius: 8px;
        padding: 40px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    `
  ]
})
export class ClientServicesComponent implements OnInit {
  // Liste des services récupérés depuis le backend
  services: Service[] = [];
  // Variable de suivi de l'état de chargement
  loading = false;
  // Variable pour gérer les erreurs potentielles de chargement
  error: string | null = null;

  // Injection des services nécessaires dans le constructeur
  constructor(
    private clientServiceService: ClientServiceService,  // Service pour récupérer les services
    private notificationService: NotificationService  // Service pour afficher les notifications
  ) {}

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.loadServices();  // Charge les services dès que le composant est initialisé
  }

  // Fonction pour récupérer tous les services via le service
  loadServices(): void {
    this.loading = true;  // Activation de l'état de chargement
    this.clientServiceService.getAllServices().subscribe({
      // En cas de succès de la requête
      next: (services) => {
        this.services = services;  // Stocke les services récupérés dans la variable `services`
        this.loading = false;  // Désactive l'état de chargement
      },
      // En cas d'erreur lors du chargement des services
      error: (error) => {
        console.error('Erreur chargement services:', error);  // Affiche l'erreur dans la console
        this.error = 'Erreur lors du chargement des services. Veuillez réessayer.';  // Affiche un message d'erreur à l'utilisateur
        this.loading = false;  // Désactive l'état de chargement
      }
    });
  }

  // Fonction pour formater la durée en minutes sous forme lisible
  formatDuration(minutes: number): string {
    if (!minutes) return '0 min';  // Si la durée est nulle, renvoie '0 min'
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);  // Calcule le nombre d'heures
      const remainingMinutes = minutes % 60;  // Calcule le reste des minutes
      // Renvoie la durée sous forme d'heures et de minutes (si nécessaire)
      return remainingMinutes > 0 ? `${hours}h${remainingMinutes}min` : `${hours}h`;
    }
    return `${minutes}min`;  // Si moins de 60 minutes, renvoie la durée en minutes seulement
  }
}
