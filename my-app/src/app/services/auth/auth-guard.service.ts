import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  static canActivateAdmin: any;
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Vérifiez si l'utilisateur est un admin

    if (token) {
      return true; // L'utilisateur est authentifié
    } else {
      this.router.navigate(['/login']); // Rediriger vers la page de connexion
      return false; // Accès refusé
    }
  }

  canActivateAdmin(): boolean {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Vérifiez si l'utilisateur est un admin

    if (token && isAdmin) {
      return true; // L'utilisateur est un admin
    } else {
      this.router.navigate(['/login']); // Rediriger vers la page de connexion
      return false; // Accès refusé
    }
  }
}
