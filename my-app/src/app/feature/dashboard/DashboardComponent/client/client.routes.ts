// Importation des modules nécessaires
import { Routes } from '@angular/router'; // Pour définir les routes dans Angular
import { ClientDashboardComponent } from './client-dashboard.component'; // Composant principal du dashboard client
import { ClientProfileComponent } from './profile/client-profile.component'; // Composant pour afficher/modifier le profil du client

// Importation des autres composants utilisés dans les routes
import { ProductDetailComponent } from '../../../../components/Product/product-detail.component'; // Composant pour afficher le détail d'un produit
import { CartComponent } from '../../../../components/Cart/cart.component'; // Composant pour afficher et gérer le panier
import { ClientProductsComponent } from './Products/client-products.component'; // Composant pour afficher la liste des produits
import { CheckoutComponent } from '../../../../components/checkout/checkout.component'; // Composant pour gérer le processus de validation de commande
import { AuthGuard } from '../../guard/auth.guard'; // Gardien de sécurité pour protéger certaines routes nécessitant une authentification
import { ClientOrderDetailComponent } from './orders/client-order-detail.component'; // Composant pour afficher les détails d'une commande
import { ClientOrdersComponent } from './orders/client-orders.component'; // Composant pour afficher la liste des commandes du client

// Définition des routes pour l'espace client
export const clientRoutes: Routes = [
  {
    path: '', // La route vide redirige vers le dashboard client
    component: ClientDashboardComponent, // Composant principal du dashboard
    children: [ // Routes enfants qui sont accessibles sous ce dashboard
      {
        path: '', // Si aucune sous-route n'est définie, redirige vers la route 'products'
        redirectTo: 'products', // Redirection vers les produits
        pathMatch: 'full' // La redirection se fait uniquement si le chemin est vide
      },
      {
        path: 'products', // Route pour afficher la liste des produits
        component: ClientProductsComponent, // Composant pour l'affichage des produits
        data: { title: 'Nos Produits' } // Donnée associée à cette route, utilisée pour définir le titre de la page
      },
      {
        path: 'products/:id', // Route dynamique pour afficher le détail d'un produit
        component: ProductDetailComponent, // Composant pour afficher le détail du produit
        data: { title: 'Détail du produit' } // Donnée associée à cette route, utilisée pour définir le titre de la page
      },
      {
        path: 'cart', // Route pour afficher le panier
        component: CartComponent, // Composant pour afficher et gérer le panier
        data: { title: 'Mon Panier' } // Donnée associée à cette route, utilisée pour définir le titre de la page
      },
      {
        path: 'checkout', // Route pour la validation de la commande
        component: CheckoutComponent, // Composant pour gérer le processus de commande
        canActivate: [AuthGuard], // Cette route est protégée par un AuthGuard, il faut être authentifié pour y accéder
        data: {
          title: 'Validation de commande', // Donnée pour définir le titre de la page
          requiresAuth: true // Indication que l'authentification est requise pour cette route
        }
      },
      {
        path: 'profile', // Route pour afficher/modifier le profil du client
        component: ClientProfileComponent, // Composant pour afficher et modifier les informations du profil client
        canActivate: [AuthGuard], // Cette route est protégée par un AuthGuard, il faut être authentifié pour y accéder
        data: {
          title: 'Mon Profil', // Donnée pour définir le titre de la page
          requiresAuth: true // Indication que l'authentification est requise pour cette route
        }
      },
      {
        path: 'orders/:id', // Route dynamique pour afficher le détail d'une commande spécifique
        component: ClientOrderDetailComponent, // Composant pour afficher les détails d'une commande
        canActivate: [AuthGuard], // Cette route est protégée par un AuthGuard, il faut être authentifié pour y accéder
        data: {
          title: 'Détail de la commande', // Donnée pour définir le titre de la page
          requiresAuth: true // Indication que l'authentification est requise pour cette route
        }
      },
      {
        path: 'orders', // Route pour afficher toutes les commandes du client
        component: ClientOrdersComponent, // Composant pour afficher la liste des commandes du client
        canActivate: [AuthGuard], // Cette route est protégée par un AuthGuard, il faut être authentifié pour y accéder
        data: {
          title: 'Mes Commandes', // Donnée pour définir le titre de la page
          requiresAuth: true // Indication que l'authentification est requise pour cette route
        }
      }
    ]
  }
];
