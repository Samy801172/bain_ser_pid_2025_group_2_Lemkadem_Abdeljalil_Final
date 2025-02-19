// Importation des modules nécessaires pour la garde de route et l'injection de dépendances
import { CanActivateFn, Router } from '@angular/router'; // CanActivateFn est le type de fonction utilisée pour les gardes de route
import { inject } from '@angular/core'; // inject est utilisé pour obtenir une instance du service Router dans une fonction

// Fonction DashboardGuard avec des paramètres pour gérer les redirections
export function DashboardGuard(isPublic: boolean = false, redirectRoute: string = ''): CanActivateFn {
  return () => {
    // Détermine si l'utilisateur est authentifié. Ici, c'est une valeur statique (true) pour l'exemple.
    const isAuthenticated: boolean = true; 

    // Injection du service Router pour gérer la navigation
    const router: Router = inject(Router);

    // Log des informations pour suivre l'état de l'authentification et des paramètres
    console.log('isPublic:', isPublic); // Affiche si la route est publique ou privée
    console.log('isAuthenticated:', isAuthenticated); // Affiche l'état de l'authentification de l'utilisateur
    console.log('redirectRoute:', redirectRoute); // Affiche la route de redirection si nécessaire

    // Si la route est publique (isPublic = true)
    if (isPublic) {
      // Si l'utilisateur n'est pas authentifié, il peut accéder à la route publique
      if (!isAuthenticated) {
        return true; // L'accès est autorisé
      } else {
        // Si l'utilisateur est authentifié, redirection vers une autre route (redirige selon le paramètre redirectRoute)
        return router.createUrlTree([redirectRoute]);
      }
    } else {
      // Si la route n'est pas publique (isPublic = false), elle est réservée aux utilisateurs authentifiés
      if (isAuthenticated) {
        return true; // L'accès est autorisé
      } else {
        // Si l'utilisateur n'est pas authentifié, redirection vers une autre route (redirige selon le paramètre redirectRoute)
        return router.createUrlTree([redirectRoute]);
      }
    }
  }
}
