// Importation des modules nécessaires
import { Injectable } from '@angular/core'; // Injectable est un décorateur qui permet d'utiliser cette classe comme service dans Angular
import { CanActivate, Router } from '@angular/router'; // CanActivate est un garde de sécurité pour protéger les routes, Router est utilisé pour naviguer entre les routes
import { AuthService } from '../../../services/auth/auth.service'; // Service d'authentification, probablement utilisé pour vérifier l'état de l'utilisateur

// Déclaration du service AdminGuard comme injectable dans l'application
@Injectable({
  providedIn: 'root' // Ce service est disponible globalement, il est injecté automatiquement dans toute l'application
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService, // Injection du service d'authentification
    private router: Router // Injection du service de navigation pour rediriger l'utilisateur
  ) {}

  // Implémentation de la méthode canActivate pour vérifier l'accès avant d'autoriser la navigation
  canActivate(): boolean {
    // Affichage dans la console pour le débogage, indiquant qu'on est en train de vérifier les droits d'administrateur
    console.log('AdminGuard - Checking admin rights');
    
    // Affichage dans la console si l'utilisateur est un administrateur
    console.log('Is Admin?', this.authService.isAdmin());
    
    // Affichage des informations de l'utilisateur actuel pour le débogage
    console.log('Current User:', this.authService.currentUser$);

    // Si l'utilisateur n'est pas un administrateur, on refuse l'accès et on redirige vers la page "unauthorized"
    if (!this.authService.isAdmin()) {
      console.log('Access denied - redirecting to unauthorized'); // Affichage dans la console lors du refus d'accès
      this.router.navigate(['/unauthorized']); // Redirection vers la page d'accès non autorisé
      return false; // Retourne false pour bloquer l'accès à la route protégée
    }

    // Si l'utilisateur est administrateur, l'accès est autorisé
    console.log('Admin access granted'); // Affichage dans la console pour confirmer l'accès autorisé
    return true; // Retourne true pour permettre l'accès à la route protégée
  }
}
