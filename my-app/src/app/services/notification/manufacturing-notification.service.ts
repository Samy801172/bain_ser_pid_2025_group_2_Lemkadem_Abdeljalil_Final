import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Manufacturing } from '../../models/manufacturing/manufacturing.model'; // Importation du modèle de données 'Manufacturing'

@Injectable({
  providedIn: 'root' // Le service sera disponible dans toute l'application
})
export class ManufacturingNotificationService {
  // Création d'un Subject pour émettre les mises à jour de 'Manufacturing'
  private manufacturingUpdateSource = new Subject<Manufacturing>();
  
  // L'Observable permettant aux autres parties de l'application de s'abonner aux mises à jour
  manufacturingUpdate$ = this.manufacturingUpdateSource.asObservable();

  /**
   * Méthode permettant de notifier les abonnés qu'une mise à jour de l'entité 'Manufacturing' a eu lieu.
   * @param manufacturing Un objet 'Manufacturing' contenant les données mises à jour.
   */
  notifyManufacturingUpdate(manufacturing: Manufacturing) {
    this.manufacturingUpdateSource.next(manufacturing); // Envoie de l'objet 'Manufacturing' à tous les abonnés
  }
}
