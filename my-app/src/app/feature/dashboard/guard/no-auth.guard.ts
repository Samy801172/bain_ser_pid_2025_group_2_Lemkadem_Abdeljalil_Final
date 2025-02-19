import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Vérifie si l'utilisateur est déjà connecté
    if (this.authService.isAuthenticated()) {
      // Si c'est un admin, redirection vers le dashboard admin
      if (this.authService.isAdmin()) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        // Si c'est un client, redirection vers la page des produits
        this.router.navigate(['/client/products']);
      }
      return false; // Empêche l'accès à la route demandée
    }
    return true; // Permet l'accès si non connecté
  }
}
