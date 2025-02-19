import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-custom-medication-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <button 
      [routerLink]="['/client/custom-meds']"
      class="custom-med-btn"
      [disabled]="!isAuthenticated"
      (click)="onCustomMedClick()">
      Préparation sur mesure
    </button>
  `,
  styles: [`
    .custom-med-btn {
      padding: 12px 24px;
      background-color: #0056b3;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        background-color: #004494;
        transform: translateY(-1px);
      }

      &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
        opacity: 0.7;
      }
    }
  `]
})
export class CustomMedicationButtonComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // Vérifier l'état d'authentification au chargement
    this.authService.isAuthenticated$.subscribe(
      (isAuth: boolean) => {
        console.log('État d\'authentification:', isAuth);
        this.isAuthenticated = isAuth;
      }
    );
  }

  onCustomMedClick() {
    if (!this.isAuthenticated) {
      this.notificationService.info('Veuillez vous connecter pour accéder à cette fonctionnalité');
      this.router.navigate(['/login']);
    }
  }
} 