// Importation des modules nécessaires
import { inject } from '@angular/core'; // inject est utilisé pour injecter les services dans une fonction sans avoir besoin d'un constructeur
import { Router, type CanActivateFn } from '@angular/router'; // CanActivateFn est un type pour définir une fonction de garde de route qui détermine si l'accès à une route doit être autorisé ou non

// Définition de la fonction de garde pour les clients
export const clientGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Injection du service Router pour pouvoir rediriger l'utilisateur

  // Récupération des informations de l'utilisateur depuis le localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}'); // Si un utilisateur est stocké dans le localStorage, il est récupéré ici, sinon un objet vide est retourné

  // Vérification si l'utilisateur n'a pas d'ID de credential (indiquant qu'il n'est pas authentifié)
  if (!user.credential_id) {
    router.navigate(['/login']); // Si l'utilisateur n'est pas authentifié, il est redirigé vers la page de login
    return false; // L'accès à la route est bloqué
  }

  // Vérification si l'utilisateur est un administrateur
  if (user.isAdmin) {
    router.navigate(['/admin-dashboard']); // Si l'utilisateur est un administrateur, il est redirigé vers le tableau de bord admin
    return false; // L'accès à la route est bloqué pour les administrateurs (ils ne peuvent pas accéder à la page client)
  }

  // Si l'utilisateur est authentifié et non administrateur, l'accès à la route est autorisé
  return true;
};
