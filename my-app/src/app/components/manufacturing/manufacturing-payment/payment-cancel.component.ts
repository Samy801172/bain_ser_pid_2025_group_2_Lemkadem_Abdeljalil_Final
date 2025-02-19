// Importation des modules et services nécessaires depuis Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Service de navigation
import { CommonModule } from '@angular/common'; // Module pour les directives communes

// Déclaration du composant Angular avec le sélecteur 'app-payment-cancel'
@Component({
  selector: 'app-payment-cancel', // Le sélecteur utilisé pour intégrer ce composant dans d'autres templates
  standalone: true, // Indique que ce composant est autonome et ne nécessite pas de module NgModule
  imports: [CommonModule], // Importation de CommonModule pour utiliser les directives communes
  template: `
    <div class="container mt-4">
      <div class="alert alert-warning">
        <h4>Paiement annulé</h4> <!-- Titre de l'alerte -->
        <p>Le paiement a été annulé. Vous pouvez réessayer ou revenir plus tard.</p> <!-- Message d'information -->
        <button class="btn btn-primary mt-3" (click)="retryPayment()">
          Réessayer le paiement <!-- Bouton pour réessayer le paiement -->
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px; /* Largeur maximale du conteneur */
      margin: 2rem auto; /* Centrage du conteneur avec une marge */
      padding: 1rem; /* Espacement interne */
    }
    .alert-warning {
      background-color: #fff3cd; /* Fond jaune clair pour l'alerte */
      border: 1px solid #ffeeba; /* Bordure jaune */
      border-radius: 4px; /* Bordures arrondies */
      padding: 1rem; /* Espacement interne */
      margin-bottom: 1rem; /* Marge en bas */
    }
    .btn-primary {
      background-color: #0066cc; /* Fond bleu pour le bouton */
      color: white; /* Texte blanc */
      border: none; /* Pas de bordure */
      padding: 0.5rem 1rem; /* Espacement interne */
      border-radius: 4px; /* Bordures arrondies */
      cursor: pointer; /* Curseur en forme de main */
    }
  `]
})
export class PaymentCancelComponent {
  // Injection du service Router dans le constructeur
  constructor(private router: Router) {}

  // Méthode pour réessayer le paiement
  retryPayment() {
    // Récupération de l'URL actuelle
    const currentUrl = this.router.url;
    // Extraction des paramètres de l'URL (manufacturingId et amount)
    const manufacturingId = new URLSearchParams(currentUrl.split('?')[1]).get('manufacturingId');
    const amount = new URLSearchParams(currentUrl.split('?')[1]).get('amount');

    // Navigation vers la page de paiement avec les paramètres actuels
    this.router.navigate(['/manufacturing/payment'], {
      queryParams: {
        manufacturingId, // Passage de l'ID de la fabrication
        amount // Passage du montant
      }
    });
  }
}