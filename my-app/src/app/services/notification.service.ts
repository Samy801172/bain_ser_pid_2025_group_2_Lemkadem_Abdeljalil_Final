import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Service injectable dans toute l'application
})
export class NotificationService {
  constructor() {}

  // Méthode pour afficher un message d'erreur dans la console
  error(message: string) {
    console.error(message); // Ici, on utilise console.error pour simuler une notification
  }

  // Méthode pour afficher un message de succès dans la console
  success(message: string) {
    console.log(message); // Ici, on utilise console.log pour simuler une notification
  }
}
