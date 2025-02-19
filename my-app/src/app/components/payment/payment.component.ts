import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaypalButtonComponent } from '../PayPal/paypal-button.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CurrencyPipe, PaypalButtonComponent, NgIf, RouterLink],
  template: `
    <!-- HTML template for the PaymentComponent -->
    <div class="payment-container">
      <!-- Title -->
      <h3>Paiement sécurisé</h3>

      <!-- Display the total amount to pay -->
      <div class="amount">Total à payer: {{ amount | currency:'EUR' }}</div>

      <!-- PayPal button component -->
      <app-paypal-button [amount]="amount"></app-paypal-button>

      <!-- Payment buttons -->
      <div class="payment-buttons">
        <!-- Button for card payment -->
        <button class="payment-btn primary">Payer par Carte</button>

        <!-- Button for bank transfer -->
        <button class="payment-btn primary">Virement Bancaire</button>

        <!-- Button to return to the cart -->
        <button routerLink="/client/cart" class="payment-btn secondary">
          Retour au panier
        </button>
      </div>
    </div>
  `,
  styles: [`
    /* CSS styles for the PaymentComponent */
    .payment-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 20px;
    }

    .payment-btn {
      width: 100%;
      padding: 12px;
      border-radius: 6px;
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .primary {
      background: #4f46e5;
      color: white;
    }

    .secondary {
      background: #6b7280;
      color: white;
    }
  `]
})
export class PaymentComponent {
  // Input property to receive the amount to be paid
  @Input() amount!: number;

  // Output event to emit payment success details
  @Output() paymentSuccess = new EventEmitter<any>();

  // Simulate a payment process
  simulatePayment(method: string) {
    setTimeout(() => {
      this.paymentSuccess.emit({
        method,
        transactionId: 'SIMU_' + Math.random().toString(36).substr(2, 9),
        status: 'COMPLETED'
      });
    }, 2000);
  }
}
