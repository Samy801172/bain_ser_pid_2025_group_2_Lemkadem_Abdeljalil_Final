// Importation des modules nécessaires pour le composant Angular
import { Component, OnInit } from '@angular/core'; // Pour le cycle de vie du composant
import { CommonModule } from '@angular/common'; // Pour les fonctionnalités communes dans Angular
import { FormsModule } from '@angular/forms'; // Pour utiliser le two-way data binding
import { ClientService } from '../../../../../services'; // Service pour interagir avec l'API
import { Client } from '../../../../../models/client/client.model'; // Modèle représentant un client
import { User } from '../../../../../models/user/user.model'; // Modèle représentant un utilisateur

// Interface définissant un client avec un utilisateur (client avec ses données utilisateur associées)
interface ClientWithUser extends Client {
  user: User; // Propriété "user" forcée à ne pas être nulle
}

// Définition du composant Angular
@Component({
  selector: 'app-client-profile', // Sélecteur du composant pour l'utiliser dans le template
  standalone: true, // Indique que ce composant peut être utilisé de manière autonome sans module
  imports: [CommonModule, FormsModule], // Modules à importer pour ce composant
  template: `
    <div class="profile-container">
      <h2>Mon Profil</h2>

      <!-- Si le client existe, on affiche ses informations -->
      @if (client) {
        <div class="profile-info">
          <div class="info-group">
            <label>Nom</label>
            <p>{{client.lastName}}</p> <!-- Affiche le nom du client -->
          </div>
          <div class="info-group">
            <label>Prénom</label>
            <p>{{client.firstName}}</p> <!-- Affiche le prénom du client -->
          </div>
          <div class="info-group">
            <label>Email</label>
            <p>{{client.user.email}}</p> <!-- Affiche l'email de l'utilisateur associé -->
          </div>
          <div class="info-group">
            <label>Adresse</label>
            <p>{{client.address}}</p> <!-- Affiche l'adresse du client -->
          </div>

          <!-- Bouton permettant de passer en mode édition -->
          <button (click)="editMode = true" class="edit-btn">
            Modifier le profil
          </button>
        </div>

        <!-- Si le mode édition est activé, afficher le formulaire de modification -->
        @if (editMode) {
          <form (ngSubmit)="updateProfile()" class="edit-form">
            <div class="form-group">
              <label for="lastName">Nom</label>
              <input
                id="lastName"
                [(ngModel)]="editForm.lastName"
                name="lastName"
                type="text"
                required
              > <!-- Champ de saisie pour le nom -->
            </div>

            <div class="form-group">
              <label for="firstName">Prénom</label>
              <input
                id="firstName"
                [(ngModel)]="editForm.firstName"
                name="firstName"
                type="text"
                required
              > <!-- Champ de saisie pour le prénom -->
            </div>

            <div class="form-group">
              <label for="address">Adresse</label>
              <input
                id="address"
                [(ngModel)]="editForm.address"
                name="address"
                type="text"
                required
              > <!-- Champ de saisie pour l'adresse -->
            </div>

            <!-- Actions du formulaire : enregistrement ou annulation -->
            <div class="form-actions">
              <button type="submit" class="save-btn">Enregistrer</button>
              <button type="button" (click)="editMode = false" class="cancel-btn">
                Annuler
              </button>
            </div>
          </form>
        }
      }
    </div>
  `,
  styles: [/* ... styles restent les mêmes ... */] // Styles de ce composant
})
export class ClientProfileComponent implements OnInit {
  // Déclaration des variables d'état du composant
  client: ClientWithUser | null = null; // Le client avec ses informations, initialisé à null
  editMode = false; // Indicateur pour savoir si le formulaire est en mode édition
  editForm: Partial<Client> = {}; // Formulaire de modification avec des champs partiels du client

  // Injection du service ClientService pour interagir avec l'API
  constructor(private clientService: ClientService) {}

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.loadProfile(); // Chargement du profil du client lors de l'initialisation
  }

  // Méthode pour charger le profil du client via le service
  loadProfile(): void {
    this.clientService.getClientProfile().subscribe({
      next: (clientData) => {
        // Si les données du client sont reçues et contiennent un utilisateur
        if (clientData && clientData.user) {
          this.client = clientData as ClientWithUser; // Assigner les données du client
          this.editForm = { // Préparer le formulaire avec les données actuelles du client
            firstName: this.client.firstName,
            lastName: this.client.lastName,
            address: this.client.address
          };
        }
      },
      error: (error) => {
        console.error('Erreur chargement profil:', error); // Gestion des erreurs de chargement
      }
    });
  }

  // Méthode pour mettre à jour le profil du client
  updateProfile(): void {
    if (this.client && this.editForm) {
      // Si le client et le formulaire sont définis, procéder à la mise à jour
      this.clientService.updateProfile(this.client.clientId, this.editForm).subscribe({
        next: (updatedClient) => {
          // Si les données mises à jour sont reçues et contiennent un utilisateur
          if (updatedClient && updatedClient.user) {
            this.client = updatedClient as ClientWithUser; // Mettre à jour le profil
            this.editMode = false; // Désactiver le mode édition
          }
        },
        error: (error) => {
          console.error('Erreur mise à jour profil:', error); // Gestion des erreurs de mise à jour
        }
      });
    }
  }
}
