// Importation du type Routes d'Angular pour la configuration des routes
import { Routes } from '@angular/router';

// Importation des composants administratifs
import { AdminOrdersComponent } from './orders/admin-orders.component';
import { AdminClientsComponent } from './clients/admin-clients.component';
import { AdminServicesComponent } from './services/admin-service.component';
import { AdminAppointmentsComponent } from './appointments/admin-appointments.component';
import { AdminProductFormComponent } from './products/product-form/admin-product-form.component';
import { AdminProductsComponent } from './products/admin-products.component';
import { AdminTypeFormComponent } from './type/type-form/admin-type-form.component';
import { AdminTypesComponent } from './type/admin-types.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminManufacturingListComponent } from './manufacturing/admin-manufacturing-list.component';

// Configuration des routes administratives
export const adminRoutes: Routes = [
  {
    path: '', // Route racine admin
    component: AdminDashboardComponent, // Composant principal du dashboard
    children: [ // Routes enfants (sous-routes)
      {
        path: '', // Route par défaut
        redirectTo: 'types', // Redirection vers la page des types
        pathMatch: 'full' // Correspondance exacte du chemin
      },
      {
        path: 'categories', // Route pour la gestion des catégories
        component: AdminTypesComponent
      },
      {
        path: 'types/add', // Route pour l'ajout d'une catégorie
        component: AdminTypeFormComponent
      },
      {
        path: 'types/edit/:id', // Route pour l'édition d'une catégorie avec paramètre id
        component: AdminTypeFormComponent
      },
      {
        path: 'products', // Route pour la gestion des produits
        component: AdminProductsComponent
      },
      {
        path: 'products/add', // Route pour l'ajout d'un produit
        component: AdminProductFormComponent
      },
      {
        path: 'products/edit/:id', // Route pour l'édition d'un produit avec paramètre id
        component: AdminProductFormComponent
      },
      {
        path: 'orders', // Route pour la gestion des commandes
        component: AdminOrdersComponent
      },
      {
        path: 'clients', // Route pour la gestion des clients
        component: AdminClientsComponent
      },
      {
        path: 'services', // Route pour la gestion des services
        component: AdminServicesComponent
      },
      {
        path: 'appointments', // Route pour la gestion des rendez-vous
        component: AdminAppointmentsComponent
      },
      {
        path: 'manufacturing', // Route pour la gestion des fabrications
        component: AdminManufacturingListComponent
      }
    ]
  }
];