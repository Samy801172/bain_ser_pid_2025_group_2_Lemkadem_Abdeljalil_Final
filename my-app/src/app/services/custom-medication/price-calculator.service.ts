import { Injectable } from '@angular/core';
import { Prescription } from '../../models/prescription.model';

@Injectable({
  providedIn: 'root'
})
export class PriceCalculatorService {
  calculatePrice(prescription: Prescription): number {
    let basePrice = 0;
    
    // Analyse de l'ordonnance
    switch (prescription.type) {
      case 'cream':
        basePrice = 30;
        break;
      case 'capsules':
        basePrice = 45;
        break;
      case 'other':
        basePrice = 40;
        break;
    }
    
    // Ajout des composants
    basePrice += prescription.components.length * 5;
    
    // Complexité
    switch (prescription.complexity) {
      case 'low':
        basePrice *= 1;
        break;
      case 'normal':
        basePrice *= 1.2;
        break;
      case 'high':
        basePrice *= 1.5;
        break;
    }
    
    return basePrice;
  }
} 