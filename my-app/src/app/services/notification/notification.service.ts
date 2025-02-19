// services/notification.service.ts

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

// Définition de l'interface NotificationMessage
// Cette interface décrit la structure d'un message de notification, qui peut être de différents types.
export interface NotificationMessage {
  type: 'success' | 'error' | 'warning' | 'info'; // Type de notification (succès, erreur, avertissement, info)
  message: string; // Le message de la notification
  duration?: number; // La durée d'affichage de la notification (en ms), optionnelle, si non fournie, une valeur par défaut sera utilisée.
}

@Injectable({
  providedIn: 'root' // Le service sera disponible dans toute l'application
})
export class NotificationService {
  private notificationSubject = new Subject<NotificationMessage>(); // Subject qui émet des notifications

  /**
   * Méthode privée pour envoyer une notification.
   * @param notification Un objet NotificationMessage contenant les détails de la notification à afficher.
   */
  show(notification: NotificationMessage): void {
    this.notificationSubject.next({
      duration: 5000, // Durée par défaut de la notification (5000 ms)
      ...notification // Fusionne les données de notification passées avec la valeur de durée par défaut si non définie
    });
  }

  /**
   * Méthode pour afficher une notification de type 'success'.
   * @param message Le message de la notification.
   * @param duration (optionnel) La durée d'affichage de la notification.
   */
  success(message: string, duration?: number): void {
    this.show({ type: 'success', message, duration });
  }

  /**
   * Méthode pour afficher une notification de type 'error'.
   * @param message Le message de la notification.
   * @param duration (optionnel) La durée d'affichage de la notification.
   */
  error(message: string, duration?: number): void {
    this.show({ type: 'error', message, duration });
  }

  /**
   * Méthode pour afficher une notification de type 'warning'.
   * @param message Le message de la notification.
   * @param duration (optionnel) La durée d'affichage de la notification.
   */
  warning(message: string, duration?: number): void {
    this.show({ type: 'warning', message, duration });
  }

  /**
   * Méthode pour afficher une notification de type 'info'.
   * @param message Le message de la notification.
   * @param duration (optionnel) La durée d'affichage de la notification.
   */
  info(message: string, duration?: number): void {
    this.show({ type: 'info', message, duration });
  }

  /**
   * Permet aux composants d'observer les notifications et de les afficher dans l'interface utilisateur.
   * @returns Un observable qui émet les messages de notification.
   */
  getNotifications(): Observable<NotificationMessage> {
    return this.notificationSubject.asObservable(); // Retourne un observable pour que les composants puissent s'abonner et afficher les notifications.
  }
}
