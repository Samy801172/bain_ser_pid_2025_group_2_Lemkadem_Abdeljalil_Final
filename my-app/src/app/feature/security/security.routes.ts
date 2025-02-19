import { Routes } from '@angular/router';
import { AppNode } from '@shared-router';

export const securityRoutes: Routes = [
  {
    path: '',
    redirectTo: AppNode.SIGN_IN,
    pathMatch: 'full'
  },
  {
    path: AppNode.SIGN_IN,
    loadComponent: () => import('./page').then(m => m.SignInPageComponent)  // Correction ici
  },
  {
    path: '**',
    loadComponent: () => import('./page/security-error-fall-back-page/security-error-fall-back-page.component').then(m => m.SecurityErrorFallBackPageComponent)
  }
];
