import { Routes } from '@angular/router';  // Importation de la classe Routes d'Angular pour la gestion des routes
import { LoginComponent } from '../components/Login/login.component';  // Importation du composant de la page de connexion
import { RegisterComponent } from '../components/Register/register.component';  // Importation du composant pour l'inscription d'un utilisateur
import { NoAuthGuard } from '../feature/Dashboard/guard/no-auth.guard';  // Importation du garde qui vérifie si l'utilisateur n'est pas authentifié
import { AuthGuard } from '../feature/Dashboard/guard/auth.guard';  // Importation du garde qui vérifie si l'utilisateur est authentifié
import { AdminGuard } from '../feature/Dashboard/guard/admin.guard';  // Importation du garde pour les routes nécessitant un rôle administrateur
import { HomeComponent } from '../components/Home/home.component';  // Importation du composant de la page d'accueil
import { OrderConfirmationComponent } from '../components/order-confirmation/order-confirmation.component';  // Importation du composant de confirmation de commande
import { StockManagementComponent } from '../feature/Dashboard/DashboardComponent/admin/stock/stock-management.component';  // Importation du composant pour la gestion des stocks
import { PaymentSuccessComponent } from '../components/payment/payment-success.component';  // Importation du composant de succès de paiement
import { ManufacturingRequestComponent } from '../components/manufacturing/manufacturing-request/manufacturing-request.component';  // Importation du composant pour la demande de fabrication
import { ManufacturingPaymentComponent } from '../components/manufacturing/manufacturing-payment/manufacturing-payment.component';  // Importation du composant de paiement de fabrication
import { ManufacturingListComponent } from '../components/manufacturing/manufacturing-list/manufacturing-list.component';  // Importation du composant pour la liste des fabrications
import { ManufacturingConfirmationComponent } from '../components/manufacturing/manufacturing-confirmation/manufacturing-confirmation.component';  // Importation du composant pour la confirmation de fabrication
import { AuthCallbackComponent } from '../components/auth-callback/auth-callback.component';  // Importation du composant de callback

// Définition des routes pour l'application
export const routes: Routes = [
  {
    path: '',  // La route principale de l'application, affichant la page d'accueil
    component: HomeComponent,
    canActivate: [NoAuthGuard]  // Vérifie si l'utilisateur n'est pas authentifié avant d'accéder à la page d'accueil
  },
  {
    path: 'login',  // Route pour la page de connexion
    component: LoginComponent,
    canActivate: [NoAuthGuard]  // L'utilisateur ne doit pas être connecté pour accéder à cette page
  },
  {
    path: 'register',  // Route pour la page d'inscription
    component: RegisterComponent,
    canActivate: [NoAuthGuard]  // L'utilisateur ne doit pas être connecté pour accéder à cette page
  },
  {
    path: 'payment-success',  // Route pour la page de succès de paiement
    component: PaymentSuccessComponent,
    canActivate: [AuthGuard]  // L'utilisateur doit être authentifié pour accéder à cette page
  },
  {
    path: 'order-confirmation/:id',  // Route pour la confirmation de commande avec un paramètre dynamique 'id'
    component: OrderConfirmationComponent,
    canActivate: [AuthGuard]  // L'utilisateur doit être authentifié pour accéder à cette page
  },
  {
    path: 'admin/stock',  // Route pour la gestion des stocks côté administrateur
    component: StockManagementComponent,
    canActivate: [AuthGuard, AdminGuard]  // L'utilisateur doit être authentifié et avoir les droits administratifs
  },
  {
    path: 'admin',  // Route pour le dashboard administrateur avec une importation paresseuse des sous-routes
    loadChildren: () => import('../feature/Dashboard/DashboardComponent/admin/admin.routes')
      .then(m => m.adminRoutes),
    canActivate: [AuthGuard, AdminGuard]  // L'utilisateur doit être authentifié et administrateur
  },
  {
    path: 'client',  // Route pour le dashboard client avec une importation paresseuse des sous-routes
    loadChildren: () => import('../feature/Dashboard/DashboardComponent/client/client.routes')
      .then(m => m.clientRoutes),
    canActivate: [AuthGuard]  // L'utilisateur doit être authentifié pour accéder au dashboard client
  },
  // Routes spécifiques à la fabrication
  {
    path: 'manufacturing/request',  // Route pour la demande de fabrication
    component: ManufacturingRequestComponent,
    canActivate: [AuthGuard]  // L'utilisateur doit être authentifié pour accéder à cette page
  },
  {
    path: 'manufacturing/payment/:id',  // Route pour le paiement de fabrication avec un paramètre dynamique 'id'
    component: ManufacturingPaymentComponent,
    canActivate: [AuthGuard]  // L'utilisateur doit être authentifié pour accéder à cette page
  },
  {
    path: 'manufacturing/list',  // Route pour la liste des demandes de fabrication
    component: ManufacturingListComponent,
    canActivate: [AuthGuard]  // L'utilisateur doit être authentifié pour accéder à cette page
  },
  {
    path: 'manufacturing/confirmation/:id',  // Route pour la confirmation de fabrication avec un paramètre dynamique 'id'
    component: ManufacturingConfirmationComponent,
    canActivate: [AuthGuard]  // L'utilisateur doit être authentifié pour accéder à cette page
  },
  {
    path: 'payment/success',  // Route pour la page de succès de paiement (doublon de la route précédente)
    component: PaymentSuccessComponent,
    canActivate: [AuthGuard]  // L'utilisateur doit être authentifié pour accéder à cette page
  },
  {
    path: 'auth/callback',
    component: AuthCallbackComponent,
    canActivate: [NoAuthGuard]  // Optionnel: empêche l'accès si déjà connecté
  }
];
