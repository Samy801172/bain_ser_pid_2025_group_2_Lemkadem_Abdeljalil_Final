// services/client/client.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../models/Appointment/appointment.model'; // Modèle pour un rendez-vous
import { Client } from '../../models/client/client.model'; // Modèle pour un client
import { Order } from '../../models/order/order.model'; // Modèle pour une commande

@Injectable({
  providedIn: 'root' // Permet à ce service d'être injecté dans toute l'application
})
export class ClientService {
  private readonly API_URL = 'http://localhost:2024/api/clients'; // URL de l'API pour accéder aux données des clients

  constructor(private http: HttpClient) {} // Injection du service HttpClient pour effectuer des requêtes HTTP

  // Récupère le profil d'un client
  getClientProfile(): Observable<Client> {
    return this.http.get<Client>(`${this.API_URL}/profile`); // Envoie une requête GET pour obtenir le profil du client
  }

  // Met à jour le profil d'un client
  updateProfile(clientId: number, data: Partial<Client>): Observable<Client> {
    return this.http.put<Client>(`${this.API_URL}/${clientId}`, data); // Envoie une requête PUT pour mettre à jour le profil du client
  }

  // Récupère la liste des commandes d'un client
  getClientOrders(clientId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API_URL}/${clientId}/orders`); // Envoie une requête GET pour obtenir les commandes d'un client
  }

  // Récupère la liste des rendez-vous d'un client
  getClientAppointments(clientId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.API_URL}/${clientId}/appointments`); // Envoie une requête GET pour obtenir les rendez-vous d'un client
  }
}
