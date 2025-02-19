// src/app/services/stock/stock.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification/notification.service';
import {Product} from '../../models/product/product.model';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getStockAlerts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stock/alerts`);
  }

  downloadStockCsv(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/stock/export`, {
      responseType: 'blob'
    });
  }
}
