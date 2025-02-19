// feature/Dashboard/DashboardComponent/admin/invoices/admin-invoices.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// Interfaces
interface OrderLine {
  productId: number;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  date_order: string;
  date: string;
  id_statut: number;
  orderDate: Date;
  status: { name: string };
  total: number;
  clientId: number;
  client: { name: string; id: number };
  orderLines: OrderLine[];
}

interface DisplayInvoice {
  id: number;
  invoiceNumber: string;
  clientName: string;
  issueDate: string;
  totalAmount: number;
  billingAddress: string;
  paymentStatus: 'paid' | 'pending' | 'cancelled';
  order: Order;
}

@Component({
  selector: 'app-admin-invoices',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    // ... (même template que précédemment)
  `,
  styles: [`
    // ... (mêmes styles que précédemment)
  `]
})
export class AdminInvoicesComponent implements OnInit {
  invoices: DisplayInvoice[] = [];
  filteredInvoices: DisplayInvoice[] = [];
  selectedInvoice: DisplayInvoice | null = null;
  searchTerm = '';
  statusFilter = '';

  constructor(private http: HttpClient) {
    // Données initiales de test
    this.invoices = [{
      id: 1,
      invoiceNumber: 'INV-2024-001',
      clientName: 'John Doe',
      issueDate: '2024-01-15',
      totalAmount: 150.00,
      billingAddress: '123 Main St',
      paymentStatus: 'paid',
      order: {
        id: 1,
        date_order: '2024-01-15',
        date: '2024-01-15',
        id_statut: 1,
        orderDate: new Date(),
        status: { name: 'completed' },
        total: 150.00,
        clientId: 1,
        client: { name: 'John Doe', id: 1 },
        orderLines: [{
          productId: 1,
          quantity: 2,
          price: 75.00
        }]
      }
    }];
    this.filteredInvoices = [...this.invoices];
  }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.http.get<DisplayInvoice[]>('http://localhost:2024/api/invoices')
      .subscribe({
        next: (data) => {
          this.invoices = data;
          this.filteredInvoices = data;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des factures:', error);
        }
      });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }

  getStatusLabel(status: DisplayInvoice['paymentStatus']): string {
    switch (status) {
      case 'paid': return 'Payée';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  }

  filterInvoices(): void {
    let filtered = this.invoices;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(invoice =>
        invoice.invoiceNumber.toLowerCase().includes(term) ||
        invoice.clientName.toLowerCase().includes(term)
      );
    }

    if (this.statusFilter) {
      filtered = filtered.filter(invoice =>
        invoice.paymentStatus === this.statusFilter as DisplayInvoice['paymentStatus']
      );
    }

    this.filteredInvoices = filtered;
  }

  viewInvoice(invoice: DisplayInvoice): void {
    this.selectedInvoice = invoice;
  }

  downloadInvoice(invoice: DisplayInvoice): void {
    // TODO: Implémenter le téléchargement
    console.log('Téléchargement de la facture:', invoice.invoiceNumber);
  }

  markAsPaid(invoice: DisplayInvoice): void {
    if (confirm(`Marquer la facture ${invoice.invoiceNumber} comme payée ?`)) {
      this.http.patch(`http://localhost:2024/api/invoices/${invoice.id}/status`, {
        status: 'paid'
      }).subscribe({
        next: () => {
          this.loadInvoices();
        },
        error: (error) => {
          console.error('Erreur lors du changement de statut:', error);
        }
      });
    }
  }
}
