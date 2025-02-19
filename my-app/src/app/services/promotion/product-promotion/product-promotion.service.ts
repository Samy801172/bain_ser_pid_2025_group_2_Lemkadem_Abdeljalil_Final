// services/product-promotion/product-promotion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductPromotionService {
  private API_URL = 'http://localhost:2024/api';

  constructor(private http: HttpClient) {}

  createProductPromotion(productPromotionDto: any): Observable<any> {
    return this.http.post(`${this.API_URL}/product-promotions`, {
      id_product: Number(productPromotionDto.id_product),
      id_promotion: Number(productPromotionDto.id_promotion)
    });
  }

  getActiveProductPromotions(): Observable<any> {
    return this.http.get(`${this.API_URL}/product-promotions/active`);
  }
}
