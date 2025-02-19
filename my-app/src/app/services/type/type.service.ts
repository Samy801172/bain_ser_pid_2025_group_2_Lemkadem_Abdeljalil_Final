import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Type } from '../../models/type/type.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private readonly API_URL = 'http://localhost:2024/api/types';

  constructor(private http: HttpClient) {}

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.API_URL).pipe(
      catchError(this.handleError)
    );
  }

  getTypeById(id: number): Observable<Type> {
    return this.http.get<Type>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createType(type: Partial<Type>): Observable<Type> {
    // Vérification des données avant envoi
    if (!type.name?.trim()) {
      return throwError(() => new Error('Le nom du type est requis'));
    }

    if (type.name.length > 200) {
      return throwError(() => new Error('Le nom ne doit pas dépasser 200 caractères'));
    }

    return this.http.post<Type>(this.API_URL, type).pipe(
      catchError(this.handleError)
    );
  }

  updateType(id: number, type: Partial<Type>): Observable<Type> {
    return this.http.put<Type>(`${this.API_URL}/${id}`, type).pipe(
      catchError(this.handleError)
    );
  }

  deleteType(id: string | number): Observable<void> {
    // Assurez-vous que l'id est un nombre valide
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return throwError(() => new Error('ID invalide'));
    }
    return this.http.delete<void>(`${this.API_URL}/${numericId}`);
  }

  checkTypeExists(name: string): Observable<boolean> {
    return this.getTypes().pipe(
      map(types => types.some(type =>
        type.name.toLowerCase() === name.toLowerCase())
      )
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = error.error.message;
    } else {
      // Erreur côté serveur
      switch (error.status) {
        case 400:
          errorMessage = 'Données invalides';
          break;
        case 404:
          errorMessage = 'Type non trouvé';
          break;
        case 409:
          errorMessage = 'Ce type existe déjà';
          break;
        default:
          errorMessage = 'Erreur serveur';
      }
    }

    return throwError(() => errorMessage);
  }
}
