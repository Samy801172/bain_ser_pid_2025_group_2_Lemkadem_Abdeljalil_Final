import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ManufacturingDetails, Manufacturing, ManufacturingStatus } from '../../models/manufacturing/manufacturing.model';
import { ManufacturingResponse } from '../../models/manufacturing/manufacturing-request.model';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';
import { ManufacturingNotificationService } from '../manufacturing/manufacturing-notification.service';

@Injectable({
  providedIn: 'root'
})
export class ManufacturingService {
  private apiUrl = `${environment.apiUrl}/manufacturing`; // URL de l'API pour les opérations de fabrication

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private manufacturingNotificationService: ManufacturingNotificationService
  ) {}

  // Créer une demande de fabrication
  createManufacturingRequest(formData: FormData): Observable<ManufacturingResponse> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.getAuthToken()}`); // Ajout du token d'authentification

    // Définir un prix total et un acompte
    const totalPrice = 50;
    const deposit = totalPrice * 0.3; // 30% d'acompte

    // Ajouter ces informations à la requête
    formData.append('totalPrice', totalPrice.toString());
    formData.append('deposit', deposit.toString());
    formData.append('status', ManufacturingStatus.EN_ATTENTE_ACOMPTE); // Statut initial

    const clientId = localStorage.getItem('clientId');
    if (clientId) {
      formData.append('clientId', clientId); // Ajout du client ID si présent
    }

    // Envoi de la demande de fabrication à l'API
    return this.http.post<ManufacturingResponse>(
      `${this.apiUrl}/request`,
      formData,
      { headers }
    ).pipe(
      tap(response => {
        console.log('Réponse du serveur:', response); // Affichage de la réponse du serveur
        this.notificationService.success('Demande envoyée avec succès'); // Notification de succès
      }),
      catchError(error => {
        console.error('Erreur détaillée:', error); // Log de l'erreur
        this.notificationService.error('Erreur lors de l\'envoi de la demande'); // Notification d'erreur
        throw error; // Rejet de l'erreur
      })
    );
  }

  // Récupérer les éléments de fabrication du client
  getClientManufacturingItems(): Observable<Manufacturing[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAuthToken()}` // Token d'authentification
    );

    return this.http.get<Manufacturing[]>(
      `${this.apiUrl}/orders/client`,
      { headers }
    ).pipe(
      map(items => items.map(item => ({
        ...item,
        statusText: this.getStatusText(item.status), // Récupération du texte du statut
        statusClass: this.getStatusClass(item.status) // Récupération de la classe CSS du statut
      }))),
      tap(items => console.log('Fabrications chargées:', items)), // Log des éléments chargés
      catchError(error => {
        console.error('Erreur chargement fabrications:', error); // Log de l'erreur
        this.notificationService.error('Erreur lors du chargement des fabrications'); // Notification d'erreur
        return throwError(() => error); // Rejet de l'erreur
      })
    );
  }

  // Récupérer le texte d'un statut
  private getStatusText(status: ManufacturingStatus): string {
    const statusMap = {
      'EN_ATTENTE_ACOMPTE': 'En attente d\'acompte',
      'ACOMPTE_PAYE': 'Acompte payé',
      'EN_FABRICATION': 'En fabrication',
      'PRET': 'Prêt',
      'TERMINE': 'Terminé'
    };
    return statusMap[status] || 'Inconnu'; // Retourne le texte correspondant au statut
  }

  // Récupérer la classe CSS d'un statut
  private getStatusClass(status: ManufacturingStatus): string {
    const statusClassMap = {
      'EN_ATTENTE_ACOMPTE': 'status-pending',
      'ACOMPTE_PAYE': 'status-deposit',
      'EN_FABRICATION': 'status-progress',
      'PRET': 'status-ready',
      'TERMINE': 'status-completed'
    };
    return statusClassMap[status] || 'status-unknown'; // Retourne la classe CSS correspondant au statut
  }

  // Récupérer les détails de fabrication d'une commande
  getManufacturingDetails(id: number): Observable<ManufacturingDetails> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAuthToken()}`
    );

    return this.http.get<ManufacturingDetails>(
      `${this.apiUrl}/orders/${id}`,
      { headers }
    ).pipe(
      tap(response => {
        console.log('Détails de fabrication:', response); // Log des détails de fabrication
      })
    );
  }

  // Mettre à jour le statut d'une commande
  updateManufacturingStatus(id: number, status: ManufacturingStatus): Observable<Manufacturing> {
    const headers = this.getAuthHeaders();
    
    return this.http.put<Manufacturing>(
      `${this.apiUrl}/orders/${id}/status`,
      { status: status },
      { headers }
    ).pipe(
      tap((response) => {
        console.log('Statut mis à jour:', response); // Log du statut mis à jour
        this.notificationService.success('Statut mis à jour avec succès'); // Notification de succès
      }),
      catchError(error => {
        console.error('Erreur mise à jour statut:', error); // Log de l'erreur
        this.notificationService.error('Erreur lors de la mise à jour du statut'); // Notification d'erreur
        return throwError(() => error); // Rejet de l'erreur
      })
    );
  }

  // Obtenir les en-têtes d'authentification
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
  }

  // Valider l'ordonnance d'une commande
  validatePrescription(id: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAuthToken()}`
    );

    return this.http.post(
      `${this.apiUrl}/orders/${id}/validate-prescription`,
      {},
      { headers }
    ).pipe(
      tap(() => {
        this.notificationService.success('Ordonnance validée avec succès'); // Notification de succès
      }),
      catchError(error => {
        this.notificationService.error('Erreur lors de la validation de l\'ordonnance'); // Notification d'erreur
        throw error; // Rejet de l'erreur
      })
    );
  }

  // Traiter le paiement de l'acompte d'une commande
  processDeposit(orderId: number, paymentMethod: string, paymentData: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAuthToken()}`
    );

    return this.http.post(
      `${this.apiUrl}/orders/${orderId}/deposit`,
      {
        paymentMethod,
        paymentData,
        amount: this.calculateDepositAmount(paymentData.amount) // Calcul de l'acompte
      },
      { headers }
    );
  }

  // Calculer le montant de l'acompte (30% du montant total)
  private calculateDepositAmount(totalAmount: number): number {
    return totalAmount * 0.3; // 30% d'acompte
  }

  // Obtenir le token d'authentification
  private getAuthToken(): string {
    return localStorage.getItem('token') || ''; // Retourne le token d'authentification
  }

  // Obtenir l'URL pour accéder au fichier d'ordonnance
  getPrescriptionFileUrl(filename: string): string {
    return `${environment.apiUrl}/uploads/prescriptions/${filename}`;
  }

  // Ajouter une note à une commande
  addNote(id: number, note: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAuthToken()}`
    );

    return this.http.post(
      `${this.apiUrl}/orders/${id}/notes`,
      { note },
      { headers }
    ).pipe(
      tap(() => console.log('Note ajoutée avec succès')), // Log de succès
      catchError(error => {
        console.error('Erreur lors de l\'ajout de la note:', error); // Log de l'erreur
        throw error; // Rejet de l'erreur
      })
    );
  }

  // Mettre à jour la date estimée de fin de fabrication
  updateEstimatedDate(id: number, date: Date): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAuthToken()}`
    );

    return this.http.put(
      `${this.apiUrl}/orders/${id}/estimated-date`,
      { estimatedCompletionDate: date },
      { headers }
    ).pipe(
      tap(() => console.log('Date estimée mise à jour')), // Log du succès
      catchError(error => {
        console.error('Erreur lors de la mise à jour de la date:', error); // Log de l'erreur
        throw error; // Rejet de l'erreur
      })
    );
  }

  // Obtenir tous les éléments de fabrication pour un administrateur
  getAllManufacturingItems(): Observable<Manufacturing[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    return this.http.get<Manufacturing[]>(`${this.apiUrl}/admin/orders`, { headers }).pipe(
      tap(items => {
        console.log('Fabrications chargées:', items); // Log des éléments chargés
      }),
      catchError(error => {
        console.error('Erreur lors du chargement des fabrications:', error); // Log de l'erreur
        this.notificationService.error('Erreur lors du chargement des fabrications'); // Notification d'erreur
        return throwError(() => error); // Rejet de l'erreur
      })
    );
  }
}
