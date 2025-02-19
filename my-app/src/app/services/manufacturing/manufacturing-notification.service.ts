import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Manufacturing } from '../../models/manufacturing/manufacturing.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturingNotificationService {
  constructor(private socket: Socket) {}

  // Écouter les mises à jour de statut
  getStatusUpdates(): Observable<Manufacturing> {
    return this.socket.fromEvent<Manufacturing>('manufacturing-status-update');
  }

  // Émettre une mise à jour de statut
  emitStatusUpdate(manufacturing: Manufacturing) {
    this.socket.emit('manufacturing-status-update', manufacturing);
  }
} 