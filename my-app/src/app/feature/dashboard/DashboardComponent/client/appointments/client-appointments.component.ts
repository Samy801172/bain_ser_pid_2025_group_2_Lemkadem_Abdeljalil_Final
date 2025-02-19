// Composant pour gérer l'affichage des rendez-vous côté client
import { Component, OnInit } from '@angular/core'; // Import des décorateurs Component et OnInit
import { CommonModule } from '@angular/common'; // Import pour les directives communes Angular
import { HttpClient } from '@angular/common/http'; // Import pour les requêtes HTTP

@Component({
  selector: 'app-client-appointments', // Sélecteur pour utiliser le composant dans le HTML
  standalone: true, // Indique que c'est un composant autonome
  imports: [CommonModule], // Import des modules nécessaires
  templateUrl: './client-appointments.component.html', // Template HTML associé
  styleUrls: ['./client-appointments.component.scss'] // Styles SCSS associés
})
export class ClientAppointmentsComponent implements OnInit {
  // Tableau pour stocker les rendez-vous du client
  appointments: any[] = [];

  // Injection du service HttpClient pour les requêtes API
  constructor(private http: HttpClient) {}

  // Méthode d'initialisation du composant
  ngOnInit() {
    this.loadMyAppointments(); // Charge les rendez-vous au démarrage
  }

  // Méthode pour charger les rendez-vous du client connecté
  loadMyAppointments() {
    // Récupère l'ID de l'utilisateur depuis le localStorage
    const userId = localStorage.getItem('userId');
    // Appel API pour récupérer les rendez-vous du client
    this.http.get(`http://localhost:2024/api/clients/${userId}/appointments`).subscribe({
      next: (data: any) => this.appointments = data, // Stocke les rendez-vous reçus
      error: (error) => console.error('Erreur chargement rendez-vous:', error) // Gestion des erreurs
    });
  }
}