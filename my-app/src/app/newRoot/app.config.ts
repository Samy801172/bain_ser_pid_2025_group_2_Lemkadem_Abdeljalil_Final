import { ApplicationConfig } from '@angular/core';  // Importation de la configuration de l'application
import { provideRouter } from '@angular/router';  // Importation du provider pour les routes
import { routes } from './app.routes';  // Importation de la configuration des routes
import { provideHttpClient, withInterceptors } from '@angular/common/http';  // Importation des services HTTP avec gestion des interceptors
import { authInterceptor } from '../services/auth/auth.interceptor';  // Importation de l'intercepteur pour la gestion de l'authentification
import { TimerService } from '../services/timer/timer.service';  // Importation du service de minuterie pour la gestion du temps ou de sessions

// Configuration de l'application Angular avec les services et les routes nécessaires
export const appConfig: ApplicationConfig = {
  providers: [
    TimerService,  // Le service TimerService est ajouté pour être injecté dans les composants ou services qui en ont besoin
    provideRouter(routes),  // Fournit la configuration des routes à l'application
    provideHttpClient(),  // Fournit le client HTTP de base à l'application
    provideHttpClient(withInterceptors([authInterceptor]))  // Fournit le client HTTP avec l'intercepteur d'authentification
  ]
};
