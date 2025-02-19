import { Pipe, PipeTransform } from '@angular/core';

type ManufacturingStatus = 'EN_ATTENTE' | 'EN_FABRICATION' | 'TERMINE' | 'PRET_POUR_RETRAIT';

@Pipe({
  name: 'manufacturingStatus',
  standalone: true
})
export class ManufacturingStatusPipe implements PipeTransform {
  transform(value: ManufacturingStatus): string {
    const statusMap: Record<ManufacturingStatus, string> = {
      'EN_ATTENTE': 'En attente',
      'EN_FABRICATION': 'En fabrication',
      'TERMINE': 'Terminé',
      'PRET_POUR_RETRAIT': 'Prêt pour retrait'
    };
    return statusMap[value] || value;
  }
} 