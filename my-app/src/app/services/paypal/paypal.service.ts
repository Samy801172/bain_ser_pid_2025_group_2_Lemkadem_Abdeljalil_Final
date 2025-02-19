// src/app/services/paypal/paypal.service.ts
import { Injectable } from '@angular/core'; // Permet d'injecter ce service dans l'application Angular
import { HttpClient } from '@angular/common/http'; // HttpClient pour effectuer des requêtes HTTP
import { Observable, throwError } from 'rxjs'; // Observable pour les flux asynchrones et throwError pour gérer les erreurs
import { catchError } from 'rxjs/operators'; // catchError pour intercepter et gérer les erreurs dans les flux
import { environment } from '../../../environments/environment'; // Variables d'environnement, y compris l'URL de l'API

@Injectable({
  providedIn: 'root' // Ce service est injectable globalement dans l'application
})
export class PaypalService {
  // Déclare l'URL de l'API PayPal (en utilisant l'URL de base définie dans les variables d'environnement)
  private readonly apiUrl = `${environment.apiUrl}/payments/paypal`;

  constructor(private http: HttpClient) {} // Injection d'HttpClient pour effectuer des requêtes HTTP dans ce service

  // Méthode pour créer une commande PayPal
  createOrder(amount: number, orderId?: number): Observable<any> {
    // Envoie une requête POST à l'API pour créer une commande PayPal
    return this.http.post<any>(`${this.apiUrl}/create`, { amount, orderId })
      .pipe(
        catchError(error => { // Si une erreur se produit, la capture et l'affiche
          console.error('Error creating PayPal order:', error); // Affiche l'erreur dans la console
          return throwError(() => error); // Lance l'erreur pour qu'elle soit gérée en aval
        })
      );
  }

  // Méthode pour capturer un paiement PayPal
  capturePayment(orderId: string): Observable<any> {
    // Envoie une requête POST pour capturer le paiement d'une commande PayPal
    return this.http.post<any>(`${this.apiUrl}/capture/${orderId}`, {})
      .pipe(
        catchError(error => { // Si une erreur survient, la capture et l'affiche
          console.error('Error capturing payment:', error); // Affiche l'erreur dans la console
          return throwError(() => error); // Relance l'erreur
        })
      );
  }

  // Méthode pour mettre à jour le statut d'un paiement PayPal
  updatePaymentStatus(orderId: string, status: string): Observable<any> {
    // Envoie une requête PUT pour mettre à jour le statut d'un paiement PayPal
    return this.http.put<any>(`${this.apiUrl}/status/${orderId}`, { status })
      .pipe(
        catchError(error => { // En cas d'erreur, la capture et l'affiche
          console.error('Error updating payment status:', error); // Affiche l'erreur dans la console
          return throwError(() => error); // Relance l'erreur
        })
      );
  }
}
