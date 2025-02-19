// Importation des modules et services nécessaires depuis Angular et les services personnalisés
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../services/notification/notification.service';

// Déclaration du composant Angular avec le sélecteur 'app-manufacturing-confirmation'
@Component({
  selector: 'app-manufacturing-confirmation', // Le sélecteur utilisé pour intégrer ce composant dans d'autres templates
  standalone: true, // Indique que ce composant est autonome et ne nécessite pas de module NgModule
  imports: [CommonModule], // Importation de CommonModule pour utiliser les directives communes comme *ngIf, *ngFor, etc.
  template: `
    <div class="confirmation-container">
      <h2>Confirmation de Paiement</h2> <!-- Titre de la page de confirmation -->
      <div class="confirmation-content">
        <p>Votre acompte a été payé avec succès !</p> <!-- Message de confirmation de paiement -->
        <p>Numéro de commande: #{{manufacturingId}}</p> <!-- Affichage dynamique de l'ID de la commande -->
        <p>Nous allons commencer la fabrication de votre produit.</p> <!-- Message informatif -->
        <p>Vous pouvez suivre l'avancement dans la section "Mes Fabrications".</p> <!-- Instructions pour l'utilisateur -->
      </div>
    </div>
  `,
  styles: [`
    .confirmation-container {
      max-width: 600px; /* Largeur maximale du conteneur */
      margin: 2rem auto; /* Centrage du conteneur avec une marge */
      padding: 2rem; /* Espacement interne */
      background: white; /* Fond blanc */
      border-radius: 8px; /* Bordures arrondies */
      box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Ombre légère */
    }
    .confirmation-content {
      margin-top: 2rem; /* Marge au-dessus du contenu */
      text-align: center; /* Centrage du texte */
    }
    h2 {
      color: #2c3e50; /* Couleur du titre */
      text-align: center; /* Centrage du titre */
    }
    p {
      margin: 1rem 0; /* Marge autour des paragraphes */
      line-height: 1.5; /* Hauteur de ligne pour une meilleure lisibilité */
    }
  `]
})
export class ManufacturingConfirmationComponent implements OnInit {
  manufacturingId: string = ''; // Variable pour stocker l'ID de la commande

  // Injection des dépendances dans le constructeur
  constructor(
    private route: ActivatedRoute, // Service pour accéder aux paramètres de l'URL
    private notificationService: NotificationService // Service personnalisé pour les notifications
  ) {}

  // Méthode du cycle de vie Angular appelée après la création du composant
  ngOnInit() {
    this.manufacturingId = this.route.snapshot.params['id']; // Récupération de l'ID de la commande depuis l'URL
  }
}