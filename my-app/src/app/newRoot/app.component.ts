import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AppointmentComponent } from '../components/appointment/appointment.component';
import { ClientComponent } from '../components';
import { LoggingService } from '../services/Logging/Logging.service';
import { NotificationComponent } from '../components/Notifications/notification.component';
import { CardComponent } from '../shared';
import { HttpClientModule } from '@angular/common/http';
import { CartService, OrderService } from '../services';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from '../components/payment/payment.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';

// Décorateur @Component définissant les métadonnées du composant.
@Component({
  selector: 'app-root', // Le sélecteur utilisé dans le HTML pour inclure ce composant.
  standalone: true, // Définit ce composant comme autonome (sans besoin d'AppModule).
  providers: [CartService, OrderService], // Fournisseurs de services injectables spécifiques à ce composant.
  imports: [
    // Liste des modules et composants nécessaires pour ce composant.
    FormsModule,
    CommonModule,
    RouterOutlet, // Directive utilisée pour gérer les routes enfants via un espace réservé.
    NavbarComponent, // Composant pour la barre de navigation.
    HttpClientModule, // Module HTTP pour les appels API.
    RouterModule, // Nécessaire pour les fonctionnalités de routage.
    AppointmentComponent, // Composant pour gérer les rendez-vous.
    ClientComponent, // Composant pour gérer les clients.
    NotificationComponent, // Composant pour afficher les notifications.
    CardComponent, // Composant pour afficher des cartes d'informations.
    PaymentComponent,
    CheckoutComponent
  ],
  template: `
    <!-- Template HTML pour structurer l'interface utilisateur principale. -->
    <div class="app-container">
      <app-navbar></app-navbar> <!-- Barre de navigation principale. -->
      <app-notification></app-notification> <!-- Notifications globales. -->

      <main class="main-content">
        <!-- Espace réservé pour les composants enfants basés sur les routes. -->
        <!-- RouterOutlet est une directive Angular utilisée comme un point d'ancrage
          pour afficher les composants liés à une route spécifique.
          Lorsqu'une route est activée, Angular remplace <router-outlet>
          par le composant associé à cette route.

          Par exemple :
          - Si la route active est '/admin', le composant AdminComponent sera affiché ici.
          - Si la route active est '/client', le composant ClientComponent sera affiché ici.

          Cela permet de gérer dynamiquement les vues sans recharger la page.
     -->
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    // Styles CSS spécifiques à ce composant.
    `
      .app-container {
        min-height: 100vh; /* Hauteur minimale : pleine hauteur de la fenêtre. */
        display: flex; /* Flexbox pour structurer le layout. */
        flex-direction: column; /* Orientation des éléments en colonne. */
      }

      .main-content {
        flex: 1; /* Prend tout l'espace disponible. */
        padding: 20px; /* Espacement interne. */
        background-color: #f5f6fa; /* Couleur de fond. */
      }

      :host {
        /* Styles globaux du composant. */
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        color: #333; /* Couleur principale du texte. */
        box-sizing: border-box; /* Bordures incluses dans la taille des éléments. */
        -webkit-font-smoothing: antialiased; /* Lissage des polices sur WebKit. */
        -moz-osx-font-smoothing: grayscale; /* Lissage des polices sur macOS. */
      }
    `
  ]
})
export class AppComponent implements OnInit {
  // Constructeur injectant le service de journalisation et le routeur.
  constructor(
    private loggingService: LoggingService, // Service pour consigner les événements.
    private router: Router // Service pour gérer les routes.
  ) {}

  // Hook du cycle de vie Angular appelé lors de l'initialisation du composant.
  ngOnInit() {
    this.loggingService.logNavigationEvents(); // Démarre la journalisation des événements de navigation.
    console.log('Routes configurées:', this.router.config); // Affiche les configurations de routes dans la console.
  }
}
