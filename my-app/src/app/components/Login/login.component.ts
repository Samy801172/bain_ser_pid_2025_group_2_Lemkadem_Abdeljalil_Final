import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-box">
        <!-- Logo -->
        <div class="logo-container">
          <img src="assets/GOHAN-MED.jpg" alt="GOHAN-MEDLogo" class="logo">
        </div>

        <!-- Titre -->
        <h2>Connexion</h2>

        <!-- Message d'erreur -->
        <div *ngIf="error" class="error-alert">
          {{ error }}
        </div>

        <!-- Formulaire de connexion -->
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <!-- Email -->
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              [(ngModel)]="credentials.mail"
              name="email"
              required
              [class.error]="submitted && !credentials.mail"
              placeholder="Votre adresse email"
              [disabled]="isLoading"
            >
          </div>

          <!-- Mot de passe -->
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <div class="password-input">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                [(ngModel)]="credentials.password"
                name="password"
                required
                [class.error]="submitted && !credentials.password"
                placeholder="Votre mot de passe"
                [disabled]="isLoading"
              >
              <button
                type="button"
                class="toggle-password"
                (click)="showPassword = !showPassword"
                [disabled]="isLoading"
              >
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
          </div>

          <!-- Bouton de connexion -->
          <button type="submit" class="submit-btn" [disabled]="isLoading || !loginForm.form.valid">
            <span *ngIf="!isLoading">Se connecter</span>
            <span *ngIf="isLoading">Connexion en cours...</span>
          </button>
        </form>

        <!-- Séparateur -->
        <div class="separator">
          <span>ou</span>
        </div>

        <!-- Bouton Google (pour l'instant désactivé) -->
        <button 
          class="google-btn" 
          (click)="handleGoogleLogin()" 
          [disabled]="isLoading">
          <img src="assets/google-logo.svg" alt="Google Logo" class="google-icon">
          <span>Continuer avec Google</span>
        </button>

        <!-- Lien d'inscription (uniquement en mode non-admin) -->
        <div class="register-link">
          <p>Pas encore de compte ? <a routerLink="/register">S'inscrire</a></p>
        </div>

        <!-- Copyright -->
        <div class="copyright">
          <p>&copy; {{ currentYear }} IzzyBeauty. Tous droits réservés.</p>
        </div>

        <!-- Loader -->
        <div *ngIf="isLoading" class="loader-overlay">
          <div class="loader"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 10vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      padding: 20px;
    }

    .login-box {
      position: relative;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      padding: 2.5rem;
      width: 100%;
      max-width: 400px;
    }

    .logo-container {
      text-align: center;
      margin-bottom: 1rem;

      .logo {
        height: 100px;
        width: auto;
        object-fit: contain;
      }
    }

    h2 {
      color: #1a1a1a;
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 1.75rem;
      font-weight: 600;
    }

    .error-alert {
      background: #fee2e2;
      border: 1px solid #fecaca;
      color: #dc2626;
      padding: 0.75rem;
      border-radius: 6px;
      margin-bottom: 1.5rem;
      text-align: center;
      font-size: 0.875rem;
    }

    .form-group {
      margin-bottom: 1.25rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #4b5563;
        font-weight: 500;
        font-size: 0.875rem;
      }

      input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        transition: all 0.2s;
        font-size: 0.95rem;

        &:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        &.error {
          border-color: #dc2626;
        }

        &::placeholder {
          color: #9ca3af;
        }

        &:disabled {
          background-color: #f3f4f6;
          cursor: not-allowed;
        }
      }
    }

    .password-input {
      position: relative;

      .toggle-password {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        color: #6b7280;
        display: flex;
        align-items: center;

        &:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      }
    }

    .submit-btn {
      width: 100%;
      padding: 0.875rem;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 500;
      font-size: 0.95rem;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-top: 0.5rem;

      &:hover:not(:disabled) {
        background: #4338ca;
      }

      &:disabled {
        background: #9ca3af;
        cursor: not-allowed;
      }
    }

    .register-link {
      text-align: center;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;

      p {
        color: #6b7280;
        font-size: 0.875rem;

        a {
          color: #4f46e5;
          text-decoration: none;
          font-weight: 500;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .copyright {
      text-align: center;
      margin-top: 1.5rem;

      p {
        color: #9ca3af;
        font-size: 0.75rem;
      }
    }

    .loader-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      z-index: 1000;
    }

    .loader {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-radius: 50%;
      border-top: 4px solid #4f46e5;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 640px) {
      .login-box {
        padding: 1.5rem;
      }
    }

    .separator {
      display: flex;
      align-items: center;
      text-align: center;
      margin: 1.5rem 0;
      color: #6b7280;

      &::before,
      &::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #e5e7eb;
      }

      span {
        padding: 0 1rem;
        font-size: 0.875rem;
      }
    }

    .google-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 0.875rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      background: white;
      color: #374151;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-top: 1rem;

      &:hover:not(:disabled) {
        background: #f9fafb;
        border-color: #d1d5db;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .google-icon {
        width: 18px;
        height: 18px;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  credentials = {
    mail: '',
    password: ''
  };

  isLoading = false;
  error = '';
  showPassword = false;
  submitted = false;
  currentYear = new Date().getFullYear();

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const refreshToken = params['refreshToken'];
      
      if (token && refreshToken) {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        
        // Utiliser le token décodé directement
        const userRole = localStorage.getItem('userRole');
        this.router.navigate([userRole === 'admin' ? '/admin' : '/client/products']);
      }
    });
  }

  async onSubmit() {
    try {
      this.isLoading = true;
      this.submitted = true;
      this.error = '';

      if (!this.credentials.mail || !this.credentials.password) {
        this.error = 'Veuillez remplir tous les champs';
        return;
      }

      if (!this.authService.validateEmail(this.credentials.mail)) {
        this.error = 'Format d\'email invalide';
        return;
      }

      const userExists = await firstValueFrom(this.authService.checkUserExists(this.credentials.mail));

      if (!userExists) {
        this.error = "Cet utilisateur n'existe pas. Veuillez vous inscrire.";
        this.isLoading = false;
        return;
      }

      await firstValueFrom(this.authService.login(this.credentials));

      const userRole = localStorage.getItem('userRole');
      if (userRole === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/client']);
      }

    } catch (error) {
      this.error = error instanceof Error
        ? error.message
        : 'Une erreur est survenue lors de la connexion';
      console.error('Erreur de connexion:', error);
    } finally {
      this.isLoading = false;
    }
  }

  handleGoogleLogin() {
    this.isLoading = true;
    this.error = '';
    this.authService.initiateGoogleLogin();
  }
}
