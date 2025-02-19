// components/Error/unauthorized.component.ts


@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="error-container">
      <div class="error-content">
        <div class="error-icon">🔒</div>
        <h1>Accès Refusé</h1>
        <p>Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
        <div class="actions">
          <a routerLink="/" class="primary-btn">Retour à l'accueil</a>
          <a routerLink="/login" class="secondary-btn">Se connecter</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f3f4f6;
      padding: 20px;
    }

    .error-content {
      text-align: center;
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .error-icon {
      font-size: 4rem;
      margin-bottom: 1.5rem;
    }

    h1 {
      color: #1a1a1a;
      margin-bottom: 1rem;
      font-size: 2rem;
    }

    p {
      color: #6b7280;
      margin-bottom: 2rem;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;

      a {
        text-decoration: none;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        font-weight: 500;
        transition: all 0.2s;

        &.primary-btn {
          background: #4f46e5;
          color: white;

          &:hover {
            background: #4338ca;
          }
        }

        &.secondary-btn {
          background: white;
          color: #4f46e5;
          border: 1px solid #4f46e5;

          &:hover {
            background: #f8f9fa;
          }
        }
      }
    }
  `]
})
export class UnauthorizedComponent {}

// components/Error/not-found.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="error-container">
      <div class="error-content">
        <div class="error-code">404</div>
        <h1>Page Non Trouvée</h1>
        <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
        <a routerLink="/" class="home-btn">Retour à l'accueil</a>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f3f4f6;
      padding: 20px;
    }

    .error-content {
      text-align: center;
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .error-code {
      font-size: 6rem;
      font-weight: 700;
      color: #4f46e5;
      line-height: 1;
      margin-bottom: 1rem;
    }

    h1 {
      color: #1a1a1a;
      margin-bottom: 1rem;
      font-size: 2rem;
    }

    p {
      color: #6b7280;
      margin-bottom: 2rem;
    }

    .home-btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: #4f46e5;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      transition: background-color 0.2s;

      &:hover {
        background: #4338ca;
      }
    }
  `]
})
export class NotFoundComponent {}
