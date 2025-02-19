// services/user/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../models/user/user.model';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'http://localhost:2024/api/users';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  // Ajout de la méthode getUsers
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL).pipe(
      catchError(error => {
        this.notificationService.error('Erreur lors du chargement des utilisateurs');
        return throwError(() => error);
      })
    );
  }

  // Ajout de la méthode deleteUser
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${userId}`).pipe(
      catchError(error => {
        if (error.status === 409) {
          this.notificationService.error('Impossible de supprimer cet utilisateur car il a des données associées');
        } else {
          this.notificationService.error('Erreur lors de la suppression de l\'utilisateur');
        }
        return throwError(() => error);
      })
    );
  }

  // Autres méthodes existantes...
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        this.notificationService.error('Erreur lors du chargement de l\'utilisateur');
        return throwError(() => error);
      })
    );
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.API_URL, user).pipe(
      catchError(error => {
        if (error.status === 409) {
          this.notificationService.error('Un utilisateur avec cet email existe déjà');
        } else {
          this.notificationService.error('Erreur lors de la création de l\'utilisateur');
        }
        return throwError(() => error);
      })
    );
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/${id}`, user).pipe(
      catchError(error => {
        this.notificationService.error('Erreur lors de la mise à jour de l\'utilisateur');
        return throwError(() => error);
      })
    );
  }
}
