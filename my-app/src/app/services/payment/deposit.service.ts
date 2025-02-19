import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Deposit, DepositRequest, DepositPayment, CustomMedicationOrder } from '../../models/payment/deposit.model';
import { NotificationService } from '../notification/notification.service';
import { tap, catchError } from 'rxjs/operators';
import { DEPOSIT_PERCENTAGE } from '../../models/payment/deposit.model';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  private baseUrl = 'http://localhost:2024/api/deposits';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  calculateDepositAmount(totalAmount: number): number {
    return (totalAmount * DEPOSIT_PERCENTAGE) / 100;
  }

  initiateDeposit(orderId: number, totalAmount: number): Observable<DepositPayment> {
    const depositAmount = this.calculateDepositAmount(totalAmount);
    
    const payload = {
      orderId,
      amount: depositAmount,
      depositPercentage: DEPOSIT_PERCENTAGE
    };

    return this.http.post<DepositPayment>(`${this.baseUrl}/initiate`, payload).pipe(
      tap(response => {
        this.notificationService.success(`Acompte de ${DEPOSIT_PERCENTAGE}% requis: ${depositAmount}€`);
      }),
      catchError(error => {
        this.notificationService.error('Erreur lors de l\'initialisation du paiement');
        return throwError(() => error);
      })
    );
  }

  processPayment(depositId: number, paymentMethod: 'paypal' | 'stripe' | 'bancontact'): Observable<DepositPayment> {
    return this.http.post<DepositPayment>(`${this.baseUrl}/${depositId}/process`, { paymentMethod }).pipe(
      tap(response => {
        if (response.status === 'completed') {
          this.notificationService.success('Paiement de l\'acompte effectué avec succès');
        }
      }),
      catchError(error => {
        this.notificationService.error('Erreur lors du paiement');
        return throwError(() => error);
      })
    );
  }

  createDeposit(deposit: DepositRequest): Observable<Deposit> {
    return this.http.post<Deposit>(this.baseUrl, deposit);
  }

  getDepositsByOrder(orderId: number): Observable<Deposit[]> {
    return this.http.get<Deposit[]>(`${this.baseUrl}/order/${orderId}`);
  }

  confirmDeposit(depositId: number, paymentId: string): Observable<Deposit> {
    return this.http.put<Deposit>(`${this.baseUrl}/${depositId}/confirm`, { paymentId });
  }
} 