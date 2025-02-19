import { Injectable } from '@angular/core'; // Permet de marquer la classe comme un service injectable dans Angular
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importation de HttpClient et HttpHeaders pour effectuer des requêtes HTTP
import { Observable, throwError } from 'rxjs'; // Utilisation de RxJS pour les observables et la gestion des erreurs
import { catchError, tap, switchMap } from 'rxjs/operators'; // Importation des opérateurs RxJS pour le traitement des flux
import { environment } from '../../../environments/environment'; // Importation des variables d'environnement (ex: URL de l'API)
import { NotificationService } from '../notification/notification.service'; // Service pour afficher des notifications d'erreurs ou de succès
import { OrderService } from '../order/order.service'; // Service pour interagir avec les ordres (pas utilisé ici mais importé)

@Injectable({
  providedIn: 'root' // Déclare ce service comme étant disponible globalement dans toute l'application
})
export class PaymentService {
  private apiUrl = environment.apiUrl; // URL de base de l'API (dépend de l'environnement configuré)

  constructor(
    private http: HttpClient, // Injection de HttpClient pour effectuer des requêtes HTTP
    private notificationService: NotificationService, // Injection du service pour afficher des notifications
    private orderService: OrderService // Injection du service de gestion des commandes (pas utilisé ici mais injecté)
  ) {}

  // Méthode pour créer un ordre de paiement PayPal
  createPayPalOrder(amount: number, isDeposit: boolean = false, manufacturingId?: number): Observable<any> {
    const clientId = localStorage.getItem('clientId'); // Récupère l'ID client depuis le localStorage
    if (!clientId) { // Vérifie si le clientId existe dans le localStorage
      return throwError(() => new Error('Non autorisé')); // Si clientId n'est pas trouvé, lance une erreur
    }

    // Crée l'objet de données à envoyer dans la requête
    const payload = {
      amount: Number(amount.toFixed(2)), // Formate le montant en nombre à 2 décimales
      clientId: Number(clientId), // Convertit clientId en nombre
      manufacturingId, // Optionnel: ID de fabrication
      currency: 'EUR', // Monnaie EUR
      isManufacturing: !!manufacturingId // Indique si le paiement est pour un produit de fabrication
    };

    // Envoie une requête HTTP POST pour créer une commande PayPal
    return this.http.post(
      `${this.apiUrl}/payments/paypal/create`, // URL de l'API pour créer la commande PayPal
      payload, // Données envoyées dans la requête
      { headers: this.getHeaders() } // En-têtes HTTP contenant le token d'authentification
    ).pipe(
      tap(response => console.log('Ordre PayPal créé:', response)), // Logge la réponse à la requête
      catchError(error => { // Si une erreur survient, la loggue et la lance
        console.error('Erreur création commande PayPal:', error);
        return throwError(() => error); // Relance l'erreur pour qu'elle soit gérée en aval
      })
    );
  }

  // Méthode pour capturer un ordre PayPal
  capturePayPalOrder(paypalOrderId: string, manufacturingId: number): Observable<any> {
    const clientId = localStorage.getItem('clientId'); // Récupère l'ID client depuis le localStorage
    if (!clientId) { // Si clientId est absent, renvoie une erreur
      return throwError(() => new Error('Non autorisé'));
    }

    // Crée l'objet de données à envoyer dans la requête
    const payload = {
      paypalOrderId, // ID de la commande PayPal
      clientId: Number(clientId), // ID client
      manufacturingId, // ID de fabrication
      status: 'COMPLETED', // Statut de la commande
      isManufacturing: !!manufacturingId // Indique si c'est un paiement de fabrication
    };

    // Envoie une requête HTTP POST pour capturer la commande PayPal
    return this.http.post(
      `${this.apiUrl}/payments/paypal/capture/${paypalOrderId}`, // URL de l'API pour capturer la commande PayPal
      payload, // Données envoyées dans la requête
      { headers: this.getHeaders() } // En-têtes HTTP avec le token d'authentification
    ).pipe(
      tap(response => console.log('Capture PayPal réussie:', response)), // Logge la réponse de la capture
      catchError(error => { // Si une erreur survient, la loggue et affiche une notification d'erreur
        console.error('Erreur capture PayPal:', error);
        this.notificationService.error('Erreur lors de la capture du paiement'); // Notification d'erreur
        return throwError(() => error); // Relance l'erreur
      })
    );
  }

  // Méthode privée pour obtenir les en-têtes HTTP (notamment pour l'authentification)
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Récupère le token d'authentification depuis le localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
      'Content-Type': 'application/json' // Définit le type de contenu en JSON
    });
  }
}
