// Importation des modules nécessaires d'Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

// Importation du service de notification et du modèle de message de notification
import { NotificationMessage, NotificationService } from '../../services/notification/notification.service';

// Déclaration du composant Angular
@Component({
  selector: 'app-notification', // Sélecteur du composant
  standalone: true, // Indique que ce composant est autonome
  imports: [CommonModule], // Importation des modules nécessaires
  template: `
    <div class="notifications-container">
      <!-- Boucle sur chaque notification pour afficher son contenu -->
      <div
        *ngFor="let notification of notifications; trackBy: trackById"
        class="notification"
        [class]="notification.type"
      >
        <!-- Icône de la notification -->
        <span class="icon">
          <ng-container [ngSwitch]="notification.type">
            <i *ngSwitchCase="'success'" class="fas fa-check-circle"></i>
            <i *ngSwitchCase="'error'" class="fas fa-exclamation-circle"></i>
            <i *ngSwitchCase="'warning'" class="fas fa-exclamation-triangle"></i>
            <i *ngSwitchCase="'info'" class="fas fa-info-circle"></i>
          </ng-container>
        </span>
        <!-- Message de la notification -->
        <span class="message">{{ notification.message }}</span>
        <!-- Bouton pour fermer la notification -->
        <button class="close-btn" (click)="removeNotification(notification)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .notifications-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    }

    .notification {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      animation: slideIn 0.3s ease-out;

      &.success {
        background: #d1fae5;
        color: #065f46;
      }

      &.error {
        background: #fee2e2;
        color: #991b1b;
      }

      &.warning {
        background: #fff7ed;
        color: #9a3412;
      }

      &.info {
        background: #eff6ff;
        color: #1e40af;
      }

      .icon {
        margin-right: 12px;
        font-size: 1.25rem;
      }

      .message {
        flex: 1;
        font-size: 0.95rem;
      }

      .close-btn {
        background: none;
        border: none;
        padding: 4px;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.2s;

        &:hover {
          opacity: 1;
        }
      }
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: NotificationMessage[] = []; // Liste des notifications
  private subscription: Subscription = new Subscription(); // Abonnement aux notifications

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Abonnement aux notifications lors de l'initialisation du composant
    this.subscription = this.notificationService.getNotifications().subscribe(
      notification => {
        this.addNotification(notification); // Ajout de la notification à la liste
      }
    );
  }

  ngOnDestroy(): void {
    // Désabonnement lors de la destruction du composant
    this.subscription.unsubscribe();
  }

  private addNotification(notification: NotificationMessage): void {
    // Ajout de la notification à la liste
    this.notifications.push(notification);
    // Suppression automatique de la notification après une certaine durée
    if (notification.duration !== undefined) {
      setTimeout(() => {
        this.removeNotification(notification);
      }, notification.duration);
    } else {
      // Durée par défaut de 3 secondes si aucune durée n'est spécifiée
      setTimeout(() => {
        this.removeNotification(notification);
      }, 3000);
    }
  }

  removeNotification(notification: NotificationMessage): void {
    // Suppression de la notification de la liste
    const index = this.notifications.indexOf(notification);
    if (index > -1) {
      this.notifications.splice(index, 1);
    }
  }

  trackById(index: number, item: NotificationMessage): string {
    // Méthode de suivi pour optimiser le rendu des notifications
    return item.message;
  }
}
