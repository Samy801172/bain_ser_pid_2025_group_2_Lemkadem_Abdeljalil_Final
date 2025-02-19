import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var paypal: any;

@Component({
  selector: 'app-paypal-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="paypal-button-container">
      <div id="paypal-button"></div>
    </div>
  `,
  styles: [`
    .paypal-button-container {
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
    }
  `]
})
export class PaypalButtonComponent implements OnInit {
  @Input() amount: number = 0;
  @Input() manufacturingRequestId: number = 0;
  @Output() paymentSuccess = new EventEmitter<any>();
  @Output() paymentError = new EventEmitter<any>();

  ngOnInit() {
    this.initPayPalButton();
  }

  private initPayPalButton() {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: 'EUR',
              value: this.amount.toString()
            },
            description: `Acompte fabrication #${this.manufacturingRequestId}`
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          this.paymentSuccess.emit({
            orderID: data.orderID,
            status: 'COMPLETED',
            details: details
          });
        });
      },
      onError: (err: any) => {
        console.error('Erreur PayPal:', err);
        this.paymentError.emit(err);
      }
    }).render('#paypal-button');
  }
} 