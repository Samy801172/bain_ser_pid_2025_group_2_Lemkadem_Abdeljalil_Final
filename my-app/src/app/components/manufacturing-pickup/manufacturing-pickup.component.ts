// Importation des modules nécessaires d'Angular
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Importation des services personnalisés
import { ManufacturingService } from '../../services/manufacturing.service';
import { NotificationService } from '../../services/notification.service';

// Déclaration du composant Angular
@Component({
  selector: 'app-manufacturing-pickup', // Sélecteur du composant
  standalone: true, // Indique que ce composant est autonome
  imports: [CommonModule, ReactiveFormsModule], // Importation des modules nécessaires
  template: `
    <div class="pickup-verification">
      <h2>Vérification du retrait</h2>

      <!-- Formulaire de vérification du code de retrait -->
      <div class="verification-form">
        <form [formGroup]="pickupForm" (ngSubmit)="verifyPickup()">
          <div class="form-group">
            <label>Code de retrait</label>
            <input type="text" formControlName="pickupCode" placeholder="Entrez le code">
          </div>

          <!-- Bouton de soumission, désactivé si le formulaire n'est pas valide ou en cours de chargement -->
          <button type="submit" [disabled]="!pickupForm.valid || loading">
            Vérifier
          </button>
        </form>
      </div>

      <!-- Affichage du résultat de la vérification si le code est valide -->
      @if (verificationResult) {
        <div class="result success">
          <i class="fas fa-check-circle"></i>
          <p>Code vérifié avec succès</p>
          <button (click)="confirmPickup()">Confirmer le retrait</button>
        </div>
      }

      <!-- Affichage d'une erreur si le code est invalide -->
      @if (verificationError) {
        <div class="result error">
          <i class="fas fa-times-circle"></i>
          <p>Code invalide</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .pickup-verification {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .result {
      margin-top: 2rem;
      padding: 1rem;
      border-radius: 4px;
      text-align: center;

      &.success {
        background: #d4edda;
        color: #155724;
      }

      &.error {
        background: #f8d7da;
        color: #721c24;
      }

      i {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background: #0066CC;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:disabled {
        background: #ccc;
      }
    }
  `]
})
export class ManufacturingPickupComponent {
  @Input() manufacturingId!: number; // ID de la fabrication, passé en entrée

  // Formulaire réactif pour la saisie du code de retrait
  pickupForm = new FormGroup({
    pickupCode: new FormControl('', Validators.required)
  });

  verificationResult: boolean = false; // Indique si le code est valide
  verificationError: boolean = false; // Indique si le code est invalide
  loading: boolean = false; // Indique si une opération est en cours

  constructor(
    private manufacturingService: ManufacturingService, // Service pour les opérations de fabrication
    private notificationService: NotificationService // Service pour les notifications
  ) {}

  verifyPickup() {
    if (this.pickupForm.valid) {
      this.loading = true;
      const code = this.pickupForm.get('pickupCode')?.value; // Récupération du code saisi

      // Appel au service pour vérifier le code de retrait
      this.manufacturingService.verifyPickupCode(this.manufacturingId, code)
        .subscribe({
          next: (result) => {
            this.verificationResult = result; // Mise à jour du résultat de la vérification
            this.verificationError = !result; // Mise à jour de l'erreur de vérification
            if (result) {
              this.notificationService.success('Code vérifié avec succès'); // Notification de succès
            } else {
              this.notificationService.error('Code invalide'); // Notification d'erreur
            }
          },
          error: (error) => {
            console.error('Erreur de vérification:', error); // Log en cas d'erreur
            this.notificationService.error('Erreur lors de la vérification'); // Notification d'erreur
            this.verificationError = true;
          },
          complete: () => this.loading = false // Fin du chargement
        });
    }
  }

  confirmPickup() {
    // Appel au service pour confirmer le retrait
    this.manufacturingService.confirmPickup(this.manufacturingId)
      .subscribe({
        next: () => {
          this.notificationService.success('Retrait confirmé'); // Notification de succès
        },
        error: (error) => {
          console.error('Erreur de confirmation:', error); // Log en cas d'erreur
          this.notificationService.error('Erreur lors de la confirmation'); // Notification d'erreur
        }
      });
  }
}
