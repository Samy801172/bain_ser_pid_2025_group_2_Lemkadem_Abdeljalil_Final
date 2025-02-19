// feature/Dashboard/DashboardComponent/admin/clients/admin-clients.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Client {
  clientId: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

@Component({
  selector: 'app-admin-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.scss']
})
export class AdminClientsComponent implements OnInit {
  clients: Client[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.http.get<Client[]>('http://localhost:2024/api/clients').subscribe({
      next: (data) => this.clients = data,
      error: (error) => console.error('Erreur de chargement des clients:', error)
    });
  }
}
