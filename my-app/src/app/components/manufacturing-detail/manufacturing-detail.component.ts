import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ManufacturingService } from '../../services/manufacturing/manufacturing.service';
import { ManufacturingDetails } from '../../models/manufacturing/manufacturing.model';
import { NotificationService } from '../../services/notification/notification.service';
import { DepositPaymentComponent } from '../deposit-payment/deposit-payment.component';
import { AuthService } from '../../services/auth/auth.service';
import { ManufacturingStatusPipe } from '../../pipes/manufacturing-status.pipe';

@Component({
  selector: 'app-manufacturing-detail',
  templateUrl: './manufacturing-detail.component.html',
  styleUrls: ['./manufacturing-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, DepositPaymentComponent, ManufacturingStatusPipe]
})
export class ManufacturingDetailComponent implements OnInit {
  orderId: number = 0; // Identifiant de la commande
  details: ManufacturingDetails | null = null; // Détails de la commande
  loading = true; // Indicateur de chargement
  error = ''; // Message d'erreur
  isAdmin = false; // Indique si l'utilisateur est un administrateur

  constructor(
    private route: ActivatedRoute, // Pour accéder aux paramètres de la route
    private manufacturingService: ManufacturingService, // Service pour les opérations de fabrication
    private notificationService: NotificationService, // Service pour les notifications
    private router: Router, // Pour la navigation
    private authService: AuthService // Service pour l'authentification
  ) {
    // Vérifie si l'utilisateur est un administrateur
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit() {
    // Récupère l'ID de la commande à partir des paramètres de la route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orderId = Number(id);
      this.loadDetails(); // Charge les détails de la commande
    } else {
      this.error = 'ID de commande non trouvé';
      this.notificationService.error(this.error); // Affiche une notification d'erreur
    }
  }

  loadDetails() {
    this.loading = true;
    this.error = '';

    // Vérifie si un token d'authentification est présent
    const token = this.authService.getToken();
    console.log('Composant - Token avant requête:', token ? 'Présent' : 'Absent');

    if (!token) {
      console.error('Composant - Pas de token disponible');
      this.error = 'Veuillez vous connecter';
      this.notificationService.error(this.error);
      this.router.navigate(['/login']); // Redirige vers la page de connexion
      return;
    }

    // Récupère les détails de la commande
    this.manufacturingService.getManufacturingDetails(this.orderId)
      .subscribe({
        next: (response) => {
          console.log('Composant - Détails reçus:', response);
          this.details = response;
          this.loading = false;
        },
        error: (error) => {
          console.error('Composant - Erreur détaillée:', error);
          if (error.status === 401) {
            this.error = 'Session expirée, veuillez vous reconnecter';
            this.router.navigate(['/login']);
          } else {
            this.error = 'Erreur lors du chargement des détails de fabrication';
          }
          this.loading = false;
          this.notificationService.error(this.error);
        }
      });
  }

  // Calcule le pourcentage de progression en fonction du statut
  getProgressPercentage(): number {
    if (!this.details) return 0;

    switch (this.details.status) {
      case 'EN_ATTENTE':
        return 25;
      case 'EN_FABRICATION':
        return 50;
      case 'TERMINE':
        return 75;
      case 'PRET_POUR_RETRAIT':
        return 100;
      default:
        return 0;
    }
  }

  // Met à jour le statut de la commande
  updateStatus(newStatus: 'EN_ATTENTE' | 'EN_FABRICATION' | 'TERMINE' | 'PRET_POUR_RETRAIT') {
    if (!this.details) return;

    this.loading = true;
    this.manufacturingService.updateManufacturingStatus(this.orderId, newStatus)
      .subscribe({
        next: (response) => {
          this.details = response;
          this.loading = false;
          this.notificationService.success('Statut mis à jour avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du statut:', error);
          this.loading = false;
          this.notificationService.error('Erreur lors de la mise à jour du statut');
        }
      });
  }
}
