// services/Service/service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:2024/api/services';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  getAllServices(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  getService(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`);
  }

  createService(data: any): Observable<any> {
    return this.http.post(API_URL, data);
  }

  updateService(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      duration: String(data.duration) // conversion en string pour le backend
    });
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
