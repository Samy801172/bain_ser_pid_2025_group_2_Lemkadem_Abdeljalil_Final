// interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';  // Importation du décorateur Injectable pour pouvoir injecter ce service dans d'autres parties de l'application
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';  // Importation des classes nécessaires pour intercepter les requêtes HTTP
import { Observable } from 'rxjs';  // Importation d'Observable pour gérer les flux asynchrones
import { AuthService } from '../services/auth/auth.service';  // Importation du service AuthService
import { catchError } from 'rxjs/operators';  // Importation de l'opérateur catchError pour gérer les erreurs
import { throwError } from 'rxjs';  // Importation de la fonction throwError pour gérer les erreurs
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

@Injectable()  // Ce décorateur permet d'injecter ce service dans toute l'application
export class AuthInterceptor implements HttpInterceptor {  // Implémentation de l'interface HttpInterceptor pour intercepter les requêtes HTTP sortantes
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  // La méthode intercept prend une requête HTTP et un gestionnaire de requête
    const token = localStorage.getItem('token');
    
    // Ne pas intercepter les requêtes d'authentification
    if (request.url.includes('/account/signin') || request.url.includes('/account/google')) {
      return next.handle(request);
    }

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      // Si pas de token et qu'on n'est pas sur une route publique, rediriger vers login
      if (!this.isPublicRoute(request.url)) {
        this.router.navigate(['/login']);
        return EMPTY;
      }
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  private isPublicRoute(url: string): boolean {
    const publicRoutes = [
      '/login',
      '/register',
      '/products', // Route publique pour voir les produits
      '/home'
    ];
    return publicRoutes.some(route => url.includes(route));
  }
}
