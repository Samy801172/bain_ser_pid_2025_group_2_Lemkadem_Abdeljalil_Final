import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { NotificationService } from '../services/notification/notification.service';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.notificationService.info('Veuillez vous connecter pour accéder à cette page');
    this.router.navigate(['/login']);
    return false;
  }
}

// Exportez aussi un alias si nécessaire
export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.getToken()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
}; 