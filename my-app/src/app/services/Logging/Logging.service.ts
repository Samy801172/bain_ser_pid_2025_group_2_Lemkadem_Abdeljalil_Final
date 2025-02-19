// services/logging/logging.service.ts
import { Injectable } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  constructor(private router: Router) {}

  logNavigationEvents(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigation démarrée vers:', event.url);
      }

      if (event instanceof NavigationEnd) {
        console.log('Navigation terminée à:', event.url);
      }

      if (event instanceof NavigationError) {
        console.error('Erreur de navigation:', {
          url: event.url,
          error: event.error
        });
      }

      if (event instanceof NavigationCancel) {
        console.warn('Navigation annulée:', {
          url: event.url,
          reason: event.reason
        });
      }
    });
  }

  logRouteConfig(): void {
    console.log('Configuration des routes:',
      JSON.stringify(this.router.config, null, 2)
    );
  }

  logAuthState(authData: any): void {
    console.log('État d\'authentification:', {
      isAuthenticated: !!authData,
      userData: authData,
      timestamp: new Date().toISOString()
    });
  }

  logError(context: string, error: any): void {
    console.error(`Erreur dans ${context}:`, {
      message: error.message || error,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
}
