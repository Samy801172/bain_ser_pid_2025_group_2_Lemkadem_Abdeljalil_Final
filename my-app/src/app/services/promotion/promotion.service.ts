// services/promotion/promotion.service.ts

// L'annotation @Injectable permet d'injecter ce service dans l'application Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // HttpClient pour effectuer des requêtes HTTP
import { Observable, catchError, throwError } from 'rxjs'; // Observable pour les flux asynchrones et gestion d'erreurs
import { NotificationService } from '../notification/notification.service'; // Service pour afficher des notifications
import { Promotion, PromotionPayload } from '../../models/promotion/promotion.model'; // Modèles pour les promotions

@Injectable({
  providedIn: 'root' // Ce service est injecté globalement dans l'application
})
export class PromotionService {
  private readonly API_URL = 'http://localhost:2024/api/promotions'; // URL de l'API pour gérer les promotions

  constructor(
    private http: HttpClient, // Injection de HttpClient pour effectuer les requêtes HTTP
    private notificationService: NotificationService // Injection du service de notification pour gérer les erreurs
  ) {}

  // Méthode pour récupérer toutes les promotions
  getAllPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.API_URL).pipe(
      catchError(error => {
        // En cas d'erreur, affiche une notification d'erreur et relance l'erreur
        this.notificationService.error('Erreur lors du chargement des promotions');
        return throwError(() => error);
      })
    );
  }

  // Méthode pour récupérer les promotions actives
  getActivePromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.API_URL}/active`).pipe(
      catchError(error => {
        // En cas d'erreur, affiche une notification d'erreur et relance l'erreur
        this.notificationService.error('Erreur lors du chargement des promotions actives');
        return throwError(() => error);
      })
    );
  }

  // Méthode pour créer une nouvelle promotion
  createPromotion(promotion: PromotionPayload): Observable<Promotion> {
    return this.http.post<Promotion>(this.API_URL, promotion).pipe(
      catchError(error => {
        // En cas d'erreur, affiche une notification d'erreur et relance l'erreur
        this.notificationService.error('Erreur lors de la création de la promotion');
        return throwError(() => error);
      })
    );
  }

  // Méthode pour mettre à jour une promotion existante
  updatePromotion(id: number, promotion: PromotionPayload): Observable<Promotion> {
    return this.http.put<Promotion>(`${this.API_URL}/${id}`, promotion).pipe(
      catchError(error => {
        // En cas d'erreur, affiche une notification d'erreur et relance l'erreur
        this.notificationService.error('Erreur lors de la mise à jour de la promotion');
        return throwError(() => error);
      })
    );
  }

  // Méthode pour supprimer une promotion
  deletePromotion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        // En cas d'erreur, affiche une notification d'erreur et relance l'erreur
        this.notificationService.error('Erreur lors de la suppression de la promotion');
        return throwError(() => error);
      })
    );
  }

  // Méthode pour prolonger une promotion existante
  extendPromotion(id: number, newEndDate: string): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/extend`, { endDate: newEndDate }).pipe(
      catchError(error => {
        // En cas d'erreur, affiche une notification d'erreur et relance l'erreur
        this.notificationService.error('Erreur lors de la prolongation de la promotion');
        return throwError(() => error);
      })
    );
  }

  // Méthode pour désactiver une promotion
  deactivatePromotion(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/deactivate`, {}).pipe(
      catchError(error => {
        // En cas d'erreur, affiche une notification d'erreur et relance l'erreur
        this.notificationService.error('Erreur lors de la désactivation de la promotion');
        return throwError(() => error);
      })
    );
  }
}
