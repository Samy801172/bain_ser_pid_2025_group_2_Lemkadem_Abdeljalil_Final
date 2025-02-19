import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError, switchMap } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NewOrder, Order } from '../../models/order/order.model';
import { NotificationService } from '../notification/notification.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { OrderStatusEnum } from '../../shared/enums/orderstatus.enum';

/**
 * Service gérant toutes les opérations liées aux commandes
 * Inclut la création, modification, suppression et consultation des commandes
 */
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // URL de base pour les endpoints liés aux commandes
  private readonly baseUrl = `${environment.apiUrl}/orders`;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Crée une nouvelle commande dans le système
   * @param orderData Données de la commande à créer
   * @returns Observable contenant la réponse du serveur
   */
  createOrder(orderData: any): Observable<any> {
    console.log('=== Début création commande frontend ===');
    
    // Transforme les données pour correspondre au format attendu par l'API
    const transformedData = {
      id_client: orderData.clientId,
      orderLines: orderData.orderLines.map((line: any) => ({
        product_id: line.productId,
        quantity: line.quantity,
        unit_price: line.unitPrice,
        original_price: line.unitPrice
      })),
      payment: {
        method: orderData.payment.method,
        transactionId: orderData.payment.transactionId,
        amount: orderData.payment.amount,
        status: 'COMPLETED'
      },
      id_statut: 2,
      montant_total: orderData.payment.amount
    };

    console.log('Données transformées:', JSON.stringify(transformedData, null, 2));

    return this.http.post(`${this.baseUrl}`, transformedData, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      tap(response => {
        console.log('Réponse du serveur après création:', response);
        this.notificationService.success('Commande créée avec succès');
      }),
      catchError(error => {
        console.error('Erreur détaillée:', error);
        this.notificationService.error(
          error.error?.message || 'Erreur lors de la création de la commande'
        );
        return throwError(() => error);
      })
    );
  }

  /**
   * Crée une commande spécifique pour la fabrication
   * @param orderData Données de la commande de fabrication
   * @returns Observable contenant la réponse du serveur
   */
  createManufacturingOrder(orderData: any): Observable<any> {
    // Transforme les données pour le format de fabrication
    const transformedData = {
      clientId: orderData.clientId,
      orderLines: orderData.orderLines,
      payment: {
        method: orderData.payment.method,
        transactionId: orderData.payment.transactionId,
        status: 'COMPLETED',
        amount: orderData.payment.amount
      },
      date_order: new Date().toISOString(),
      id_statut: 1
    };

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.getAuthToken()}`)
      .set('Content-Type', 'application/json');

    return this.http.post(`${environment.apiUrl}/manufacturing/orders`, transformedData, { headers }).pipe(
      tap(response => {
        console.log('Commande de fabrication créée:', response);
        this.notificationService.success('Commande de fabrication créée avec succès');
      }),
      catchError(error => {
        console.error('Erreur détaillée:', error);
        this.notificationService.error(
          error.error?.message || 'Erreur lors de la création de la commande de fabrication'
        );
        return throwError(() => error);
      })
    );
  }

  /**
   * Récupère le token d'authentification depuis le localStorage
   */
  private getAuthToken(): string {
    return localStorage.getItem('token') || '';
  }

  /**
   * Récupère toutes les commandes (accessible uniquement aux admins)
   */
  getAllOrders(): Observable<Order[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Order[]>(`${this.baseUrl}/admin/all`, { headers }).pipe(
      catchError(error => {
        console.error('Erreur de chargement des commandes:', error);
        return throwError(() => new Error('Impossible de charger les commandes'));
      })
    );
  }

  /**
   * Récupère les commandes d'un client spécifique
   * @param clientId ID du client
   */
  getOrdersByClientId(clientId: number): Observable<Order[]> {
    console.log(`Récupération des commandes pour le client ${clientId}`);
    const headers = this.getAuthHeaders();

    return this.http.get<Order[]>(`${this.baseUrl}/client/${clientId}`, { headers }).pipe(
      tap(orders => {
        console.log('Commandes client reçues:', orders);
      }),
      catchError(error => {
        console.error(`Erreur getOrdersByClientId pour ${clientId}:`, error);
        this.notificationService.error('Erreur lors du chargement des commandes');
        return throwError(() => error);
      })
    );
  }

  /**
   * Récupère une commande spécifique par son ID
   * Vérifie aussi que l'utilisateur a le droit d'accéder à cette commande
   * @param id ID de la commande
   */
  getOrderById(id: number): Observable<Order> {
    const headers = this.getAuthHeaders();
    const clientId = localStorage.getItem('clientId');

    if (!clientId) {
      this.notificationService.error('Session expirée');
      return throwError(() => new Error('ClientId non trouvé'));
    }

    return this.http.get<Order>(
      `${this.baseUrl}/${id}`,
      { headers }
    ).pipe(
      tap(order => {
        console.log('Commande reçue:', order);
        // Vérification de sécurité
        if (order.id_client.toString() !== clientId) {
          throw new Error('Accès non autorisé à cette commande');
        }
      }),
      catchError(error => {
        console.error('Erreur lors du chargement de la commande:', error);
        let message = 'Erreur lors du chargement de la commande';

        if (error.status === 401) {
          message = 'Session expirée, veuillez vous reconnecter';
          this.authService.logout();
        } else if (error.status === 403) {
          message = 'Accès non autorisé à cette commande';
        } else if (error.status === 404) {
          message = 'Commande non trouvée';
        }

        this.notificationService.error(message);
        return throwError(() => error);
      })
    );
  }

  /**
   * Met à jour le statut d'une commande
   * @param orderId ID de la commande
   * @param newStatus Nouveau statut
   */
  updateOrderStatus(orderId: number, newStatus: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(
      `${this.baseUrl}/${orderId}/status`,
      { statusId: newStatus },
      { headers }
    ).pipe(
      catchError(error => {
        console.error('Erreur de mise à jour du statut:', error);
        return throwError(() => new Error('Impossible de mettre à jour le statut'));
      })
    );
  }

  /**
   * Supprime une commande
   * @param orderId ID de la commande à supprimer
   */
  deleteOrder(orderId: number): Observable<void> {
    console.log(`Suppression de la commande ${orderId}`);
    const headers = this.getAuthHeaders();

    return this.http.delete<void>(`${this.baseUrl}/${orderId}`, { headers }).pipe(
      tap(() => {
        console.log('Commande supprimée avec succès');
        this.notificationService.success('Commande supprimée avec succès');
      }),
      catchError(error => {
        console.error(`Erreur deleteOrder pour ${orderId}:`, error);
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Gestion centralisée des erreurs HTTP
   * @param error Erreur HTTP reçue
   */
  private handleError(error: HttpErrorResponse): void {
    console.error('Erreur HTTP:', error);

    if (error.status === 401) {
      console.log('Erreur d\'authentification détectée');
      this.notificationService.error('Session expirée, veuillez vous reconnecter');
      this.authService.logout();
      return;
    }

    const errorMessage = error.error?.message || this.getErrorMessageByStatus(error.status);
    this.notificationService.error(errorMessage);
  }

  /**
   * Retourne un message d'erreur approprié selon le code d'état HTTP
   * @param status Code d'état HTTP
   */
  private getErrorMessageByStatus(status: number): string {
    const statusMessages: { [key: number]: string } = {
      400: 'Requête invalide',
      403: 'Accès non autorisé',
      404: 'Ressource non trouvée',
      500: 'Erreur serveur'
    };
    return statusMessages[status] || 'Une erreur est survenue';
  }

  /**
   * Met à jour une commande
   * @param orderId ID de la commande
   * @param updates Modifications à appliquer
   */
  updateOrder(orderId: number, updates: any): Observable<Order> {
    return this.http.put<Order>(
      `${this.baseUrl}/${orderId}`,
      updates,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Annule une commande
   * @param orderId ID de la commande à annuler
   */
  cancelOrder(orderId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(
      `${this.baseUrl}/${orderId}/status`,
      { statusId: 5 }, // 5 = CANCELLED
      { headers }
    ).pipe(
      tap(() => {
        this.notificationService.success('Commande annulée avec succès');
      }),
      catchError(error => {
        this.notificationService.error('Erreur lors de l\'annulation de la commande');
        return throwError(() => error);
      })
    );
  }

  /**
   * Supprime un détail de commande
   * @param detailId ID du détail à supprimer
   */
  deleteOrderDetail(detailId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(
      `${this.baseUrl}/details/${detailId}`,
      {headers}
    ).pipe(
      tap(() => this.notificationService.success('Détail supprimé')),
      catchError(error => {
        this.notificationService.error('Erreur lors de la suppression');
        return throwError(() => error);
      })
    );
  }

  /**
   * Met à jour la quantité d'un détail de commande
   * @param detailId ID du détail
   * @param quantity Nouvelle quantité
   */
  updateOrderDetail(detailId: number, quantity: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(
      `${this.baseUrl}/details/${detailId}`,
      { quantity },
      { headers }
    ).pipe(
      tap(() => this.notificationService.success('Quantité mise à jour')),
      catchError(error => {
        this.notificationService.error('Erreur lors de la mise à jour de la quantité');
        return throwError(() => error);
      })
    );
  }

  /**
   * Crée une intention de paiement
   * @param amount Montant du paiement
   */
  createPaymentIntent(amount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/payment/create`, { amount });
  }

  /**
   * Confirme un paiement
   * @param orderId ID de la commande
   */
  confirmPayment(orderId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/payment/confirm`, { orderId });
  }

  /**
   * Récupère les headers d'authentification
   * Déconnecte l'utilisateur si aucun token n'est trouvé
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Pas de token trouvé');
      this.authService.logout();
      return new HttpHeaders();
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  /**
   * Récupère les commandes du client actuellement connecté
   */
  getClientOrders(): Observable<Order[]> {
    const clientId = localStorage.getItem('clientId');
    if (!clientId) {
      return throwError(() => new Error('Client ID non trouvé'));
    }
    
    console.log('Récupération des commandes pour le client:', clientId);
    
    return this.http.get<Order[]>(`${this.baseUrl}/client/${clientId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(orders => {
        console.log('Commandes reçues du serveur:', orders);
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des commandes:', error);
        this.notificationService.error('Erreur lors du chargement des commandes');
        return throwError(() => error);
      })
    );
  }
}