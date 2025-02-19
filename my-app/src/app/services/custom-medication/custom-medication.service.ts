import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';
import { CustomMedicationResponse } from '../../models/prescription.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomMedicationService {
  private readonly API_URL = `${environment.apiUrl}/custom-medications`;

  constructor(private http: HttpClient) {}

  submit(formData: FormData): Observable<CustomMedicationResponse> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Token non trouvé'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Convertir estimatedPrice en nombre
    const estimatedPrice = Number(formData.get('estimatedPrice'));
    
    // Créer un objet avec les données du formulaire
    const customMedicationData = {
      description: formData.get('description'),
      instructions: formData.get('instructions'),
      estimatedPrice: estimatedPrice
    };

    // Créer un nouveau FormData avec les données correctement formatées
    const newFormData = new FormData();
    newFormData.append('prescription', formData.get('prescription') as File);
    newFormData.append('data', JSON.stringify(customMedicationData));

    return this.http.post<CustomMedicationResponse>(
      this.API_URL,
      newFormData,
      { headers }
    );
  }

  submitRequest(formData: FormData): Observable<CustomMedicationResponse> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Token non trouvé'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Convertir estimatedPrice en nombre
    const estimatedPrice = Number(formData.get('estimatedPrice'));
    
    // Créer un objet avec les données du formulaire
    const customMedicationData = {
      description: formData.get('description'),
      instructions: formData.get('instructions'),
      estimatedPrice: estimatedPrice
    };

    // Créer un nouveau FormData avec les données correctement formatées
    const newFormData = new FormData();
    newFormData.append('prescription', formData.get('prescription') as File);
    newFormData.append('data', JSON.stringify(customMedicationData));

    console.log('Envoi de la requête vers:', this.API_URL);
    console.log('FormData contient:', {
      data: customMedicationData,
      prescription: formData.get('prescription')
    });

    return this.http.post<CustomMedicationResponse>(
      this.API_URL,
      newFormData,
      { 
        headers,
        reportProgress: true,
        observe: 'events'
      }
    ).pipe(
      map(event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          const progress = Math.round(100 * event.loaded / event.total);
          console.log(`Upload Progress: ${progress}%`);
        }
        if (event.type === HttpEventType.Response) {
          if (event instanceof HttpResponse) {
            return event.body;
          }
        }
        return null;
      }),
      filter((response): response is CustomMedicationResponse => response !== null),
      catchError(error => {
        console.error('Erreur lors de l\'envoi:', error);
        if (error.status === 404) {
          return throwError(() => new Error('Service non disponible. Vérifiez que le backend est démarré.'));
        }
        if (error.status === 401) {
          return throwError(() => new Error('Session expirée'));
        }
        if (error.status === 400) {
          return throwError(() => new Error('Données invalides. Vérifiez les champs du formulaire.'));
        }
        return throwError(() => error);
      })
    );
  }

  getManufacturingStatus(orderId: number): Observable<CustomMedicationResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<CustomMedicationResponse>(
      `${this.API_URL}/${orderId}`,
      { headers }
    );
  }
} 