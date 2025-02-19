import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DepositService } from '../../services/payment/deposit.service';
import { NotificationService } from '../../services/notification/notification.service';
import { PriceCalculatorService } from '../../services/custom-medication/price-calculator.service';
import { CustomMedicationService } from '../../services/custom-medication/custom-medication.service';
import { Router } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { Prescription, CustomMedicationResponse } from '../../models/prescription.model';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-custom-medication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="custom-med-form">
      <h2>Préparation sur mesure</h2>
      
      <form [formGroup]="customMedForm" (ngSubmit)="onSubmit()">
        <!-- Upload ordonnance -->
        <div class="form-group">
          <label>Ordonnance (PDF/Image)</label>
          <input 
            type="file" 
            (change)="onFileSelected($event)"
            accept=".pdf,.jpg,.png"
            required
          >
        </div>

        <!-- Description -->
        <div class="form-group">
          <label>Description de la préparation</label>
          <textarea 
            formControlName="description" 
            required
            placeholder="Décrivez votre besoin..."
          ></textarea>
        </div>

        <!-- Instructions spéciales -->
        <div class="form-group">
          <label>Instructions spéciales</label>
          <textarea 
            formControlName="specialInstructions"
            placeholder="Instructions particulières..."
          ></textarea>
        </div>

        <!-- Prix estimé -->
        <div class="price-estimate" *ngIf="estimatedPrice > 0">
          <h3>Estimation du coût</h3>
          <p>Prix total: {{estimatedPrice | currency:'EUR'}}</p>
          <p>Acompte requis (30%): {{depositAmount | currency:'EUR'}}</p>
        </div>

        <button 
          type="submit" 
          [disabled]="!customMedForm.valid || !hasFile || isLoading"
          class="submit-btn">
          <span *ngIf="!isLoading">Soumettre la demande</span>
          <span *ngIf="isLoading" class="loading-spinner"></span>
        </button>
      </form>

      <!-- Indicateur de chargement -->
      <div *ngIf="isLoading" class="loading-overlay">
        <div class="spinner"></div>
        <p>Traitement de votre demande...</p>
      </div>
    </div>
  `,
  styles: [`
    .custom-med-form {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 1.5rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }

      textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        min-height: 100px;
      }

      input[type="file"] {
        width: 100%;
        padding: 0.5rem;
        border: 1px dashed #ddd;
        border-radius: 4px;
      }
    }

    button {
      width: 100%;
      padding: 1rem;
      background: #0056b3;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;

      &:disabled {
        background: #cccccc;
        cursor: not-allowed;
      }

      &:hover:not(:disabled) {
        background: #004494;
      }
    }

    .loading {
      background: #cccccc;
      cursor: not-allowed;
    }

    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #0056b3;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class CustomMedicationComponent implements OnInit {
  customMedForm: FormGroup;
  selectedFile: File | null = null;
  hasFile = false;
  isLoading = false;
  estimatedPrice = 0;
  depositAmount = 0;
  currentOrderId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private depositService: DepositService,
    private notificationService: NotificationService,
    private priceCalculator: PriceCalculatorService,
    private customMedicationService: CustomMedicationService,
    private router: Router
  ) {
    this.customMedForm = this.fb.group({
      description: ['', Validators.required],
      specialInstructions: ['']
    });
  }

  ngOnInit() {
    this.calculatePrices();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.hasFile = true;
      this.calculatePrices();
    }
  }

  onSubmit() {
    if (this.customMedForm.valid && this.selectedFile) {
      this.isLoading = true;

      const formData = new FormData();
      formData.append('prescription', this.selectedFile);
      formData.append('description', this.customMedForm.get('description')?.value);
      formData.append('instructions', this.customMedForm.get('specialInstructions')?.value);
      formData.append('estimatedPrice', this.estimatedPrice.toString());

      this.customMedicationService.submit(formData).subscribe({
        next: (response) => {
          this.notificationService.success('Demande soumise avec succès');
          this.router.navigate(['/client/manufacturing']);
        },
        error: (error) => {
          console.error('Erreur lors de la soumission:', error);
          this.notificationService.error('Erreur lors de la soumission de la demande');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  calculatePrices() {
    const formData = this.customMedForm.value;
    const prescription: Prescription = {
      type: 'cream',
      components: [],
      complexity: 'normal'
    };
    
    this.estimatedPrice = this.priceCalculator.calculatePrice(prescription);
    this.depositAmount = this.estimatedPrice * 0.3; // 30% d'acompte
  }
} 