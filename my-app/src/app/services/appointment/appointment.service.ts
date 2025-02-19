// services/appointment/appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Appointment } from '../../models/Appointment/appointment.model';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private readonly apiUrl = 'http://localhost:2024/api/appointments';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService  // Ajout du service de notification
  ) {}

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  // Une seule méthode create avec gestion des erreurs
  create(appointment: Omit<Appointment, 'appointmentId'>): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment).pipe(
      catchError(error => {
        if (error.status === 409) {
          this.notificationService.error('Ce créneau n\'est plus disponible');
        } else {
          this.notificationService.error('Erreur lors de la création du rendez-vous');
        }
        return throwError(() => error);
      })
    );
  }

  update(id: number, appointment: Partial<Appointment>): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour vérifier la disponibilité d'un créneau
  checkAvailability(date: string, time: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-availability`, {
      params: { date, time }
    });
  }

  // Méthode pour obtenir les créneaux disponibles
  getAvailableSlots(date: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/available-slots`, {
      params: { date }
    });
  }
}
