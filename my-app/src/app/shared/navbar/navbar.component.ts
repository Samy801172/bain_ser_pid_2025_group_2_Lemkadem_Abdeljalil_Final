// shared/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-content">
        <div class="nav-brand">
          <a routerLink="/" class="brand-link">
            <img src="assets/GOHAN-MED.jpg" alt="GOHAN-MED" class="nav-logo">
            GOHAN-MED
          </a>
        </div>
        
        <div class="nav-links">
          @if (!authService.isAuthenticated()) {
            <a routerLink="/login" class="nav-link">Connexion</a>
            <a routerLink="/register" class="nav-link">Inscription</a>
          }

          @if (authService.isAuthenticated() && !authService.isAdmin()) {
            <a routerLink="/" class="nav-link">Accueil</a>
            <a routerLink="/client/products" class="nav-link">Médicaments</a>
            <a routerLink="/client/services" class="nav-link">Services</a>
            <a routerLink="/client/prescriptions" class="nav-link">Mes Ordonnances</a>
            <a routerLink="/manufacturing/request" class="nav-link special">
              <i class="fas fa-mortar-pestle"></i>
              Fabrication sur Mesure
            </a>
            <a routerLink="/client/appointments" class="nav-link">Rendez-vous</a>
            <a routerLink="/client/cart" class="nav-link cart">
              <i class="fas fa-shopping-cart"></i>
              Panier
            </a>
            <a routerLink="/manufacturing/list" class="nav-link">
              <i class="fas fa-flask"></i>
              Mes Fabrications
            </a>
          }

          @if (authService.isAuthenticated() && authService.isAdmin()) {
            <a routerLink="/admin" class="nav-link">Dashboard Admin</a>
            <button (click)="onLogout()" class="nav-link logout">
              Déconnexion
            </button>
          }
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: transparent;
      padding: 0.75rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .nav-content {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
    }

    .nav-brand {
      .brand-link {
        display: flex;
        align-items: center;
        gap: 1rem;
        text-decoration: none;
        color: #1a1a1a;
        font-weight: 600;
        font-size: 1.2rem;
      }

      .nav-logo {
        height: 35px;
        width: auto;
      }
    }

    .nav-links {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .nav-link {
      color: #1a1a1a;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.2s ease;
      white-space: nowrap;
      letter-spacing: 0.3px;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      &:active {
        transform: translateY(0);
      }

      &.logout {
        background: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
        font: inherit;
        padding: 0.5rem 1rem;
        border-radius: 6px;

        &:hover {
          background: #45a049;
        }
      }
    }

    .nav-link.special {
      background: #4CAF50;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;

      &:hover {
        background: #45a049;
        transform: translateY(-2px);
      }

      i {
        font-size: 1.1rem;
      }
    }

    @media (max-width: 1024px) {
      .nav-content {
        flex-direction: column;
        gap: 1rem;
        padding: 0.5rem;
      }

      .nav-links {
        justify-content: center;
        gap: 0.5rem;
      }

      .nav-link {
        font-size: 0.9rem;
        padding: 0.5rem 0.8rem;
      }
    }

    @media (max-width: 768px) {
      .navbar {
        padding: 0.5rem;
      }

      .nav-content {
        width: 100%;
      }

      .nav-links {
        width: 100%;
        flex-direction: column;
        align-items: stretch;

        .nav-link {
          text-align: center;
          padding: 0.8rem;
          border-radius: 4px;

          &:not(:last-child) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
      }
    }
  `]
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  onLogout(): void {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      this.authService.logout();
    }
  }
}
