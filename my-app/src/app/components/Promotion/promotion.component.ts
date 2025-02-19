import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
  imports: [
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class PromotionComponent {
  // Properties to hold promotion details
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  discountPercentage: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  // Method to create a promotion
  createPromotion() {
    // Logic to create a promotion would go here
    // This could involve making an API call to a backend service
    // or performing some client-side validation and processing
  }
}
