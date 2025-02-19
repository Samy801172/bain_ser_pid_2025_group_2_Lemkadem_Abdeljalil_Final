import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ManufacturingService } from '../services/manufacturing/manufacturing.service';
import { NotificationService } from '../services/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentGuard implements CanActivate {
  constructor(
    private manufacturingService: ManufacturingService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const manufacturingId = route.params['id'];
    
    return this.manufacturingService.getManufacturingDetails(manufacturingId).pipe(
      map(details => {
        if (details.status === 'EN_ATTENTE_ACOMPTE') {
          return true;
        } else {
          this.notificationService.error('Cette fabrication a déjà été payée');
          this.router.navigate(['/manufacturing/list']);
          return false;
        }
      })
    );
  }
} 