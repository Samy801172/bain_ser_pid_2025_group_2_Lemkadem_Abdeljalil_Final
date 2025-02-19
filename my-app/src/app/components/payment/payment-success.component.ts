// src/app/components/payment/payment-success.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="success-container">
      <div class="success-icon">✓</div>
      <h2>Paiement Réussi</h2>
      <div class="success-content">
        @if (isDeposit) {
          <div class="deposit-success">
            <p>L'acompte a été payé avec succès !</p>
            <p>Votre demande de fabrication est maintenant en cours de traitement.</p>
            <div class="actions">
              <a routerLink="/manufacturing/list" class="btn primary">
                Voir mes fabrications
              </a>
            </div>
          </div>
        } @else {
          <div class="order-success">
            <p>Votre commande a été confirmée avec succès !</p>
            <p>Vous recevrez bientôt un email de confirmation.</p>
            <div class="actions">
              <a routerLink="/client/orders" class="btn primary">
                Voir mes commandes
              </a>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .success-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    .success-icon {
      font-size: 3rem;
      color: #22c55e;
      background: #dcfce7;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }
    .success-content {
      margin-top: 2rem;
    }
    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
    }
    .btn {
      display: inline-block;
      padding: 0.8rem 1.5rem;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
    }
    .primary {
      background: #2c3e50;
      color: white;
    }
    .secondary {
      border: 1px solid #2c3e50;
      color: #2c3e50;
    }
  `]
})
export class PaymentSuccessComponent implements OnInit {
  isDeposit: boolean = false;
  manufacturingId?: number;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.isDeposit = params['type'] === 'deposit';
      this.manufacturingId = params['manufacturingId'];
    });

    if (!this.isDeposit) {
      this.cartService.clearCart().subscribe({
        next: () => console.log('Panier vidé avec succès'),
        error: (err) => console.error('Erreur vidage panier:', err)
      });
    }
  }
}
