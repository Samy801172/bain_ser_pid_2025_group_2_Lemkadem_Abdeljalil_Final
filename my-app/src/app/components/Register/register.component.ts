// register.component.ts

import { Component } from '@angular/core'; // Importation du décorateur Component
import { CommonModule, NgOptimizedImage } from '@angular/common'; // Importation des modules communs et d'optimisation d'images
import { FormsModule } from '@angular/forms'; // Importation du module pour la gestion des formulaires
import { Router, RouterModule } from '@angular/router'; // Importation du module de routage
import { AuthService } from '../../services/auth/auth.service'; // Importation du service d'authentification

@Component({
  selector: 'app-register', // Définition du sélecteur du composant
  standalone: true, // Indique que le composant peut être utilisé indépendamment
  imports: [CommonModule, FormsModule, RouterModule, NgOptimizedImage], // Modules importés nécessaires au composant
  templateUrl: './register.component.html', // Chemin du fichier HTML du composant
  styleUrls: ['./register.component.scss'] // Chemin du fichier SCSS du composant
})
export class RegisterComponent {
  // Définition de l'objet utilisateur pour stocker les données du formulaire
  user = {
    username: '',
    mail: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    address: ''
  };

  error = ''; // Variable pour stocker les messages d'erreur
  isLoading = false; // Indicateur de chargement

  constructor(
    private authService: AuthService, // Injection du service d'authentification
    private router: Router // Injection du service de navigation
  ) {}

  onSubmit() {
    // Vérification si les mots de passe correspondent
    if (this.user.password !== this.user.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas'; // Message d'erreur si les mots de passe sont différents
      return;
    }

    // Création de l'objet à envoyer à l'API pour l'inscription
    const signupPayload = {
      username: this.user.username,
      mail: this.user.mail,
      password: this.user.password,
      googleHash: '', // Champs pour éventuelles connexions via Google/Facebook (non utilisés ici)
      facebookHash: ''
    };

    // Appel du service d'inscription avec l'objet signupPayload
    this.authService.signup(signupPayload).subscribe({
      next: (response) => {
        console.log('Inscription réussie:', response); // Log en cas de succès
        this.router.navigate(['/login']); // Redirection vers la page de connexion après succès
      },
      error: (error) => {
        console.error('Erreur inscription:', error); // Log en cas d'erreur
        // Gestion de l'affichage du message d'erreur en fonction du statut HTTP retourné
        this.error = error.status === 409
          ? 'Cet email est déjà utilisé. Veuillez en choisir un autre ou vous connecter.'
          : 'Erreur lors de l\'inscription';
      }
    });
  }
}
