import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-manufacturing-status-badge',
  template: `
    <span class="badge" [ngClass]="getBadgeClass()">
      {{ getStatusLabel() }}
    </span>
  `,
  styles: [`
    .badge {
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    .badge-pending { background-color: #ffd700; color: #000; }
    .badge-payment { background-color: #ff9800; color: #fff; }
    .badge-paid { background-color: #4caf50; color: #fff; }
    .badge-progress { background-color: #2196f3; color: #fff; }
    .badge-completed { background-color: #4caf50; color: #fff; }
    .badge-cancelled { background-color: #f44336; color: #fff; }
  `]
})
export class ManufacturingStatusBadgeComponent {
  @Input() status: string;

  getBadgeClass() {
    const statusMap = {
      'PENDING': 'badge-pending',
      'PAYMENT_PENDING': 'badge-payment',
      'PAID': 'badge-paid',
      'IN_PROGRESS': 'badge-progress',
      'COMPLETED': 'badge-completed',
      'CANCELLED': 'badge-cancelled'
    };
    return statusMap[this.status] || 'badge-pending';
  }

  getStatusLabel() {
    const labelMap = {
      'PENDING': 'En attente',
      'PAYMENT_PENDING': 'En attente de paiement',
      'PAID': 'Payé',
      'IN_PROGRESS': 'En cours de traitement',
      'COMPLETED': 'Terminé',
      'CANCELLED': 'Annulé'
    };
    return labelMap[this.status] || this.status;
  }
} 