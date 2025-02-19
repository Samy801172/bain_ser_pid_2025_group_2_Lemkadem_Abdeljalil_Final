

// src/app/models/promotion.model.ts
// models/promotion/promotion.model.ts
import {OrderDetail} from '../order/order.model';
import {Product} from '../product/product.model';

// src/app/models/promotion.model.ts
export interface Promotion {
  id_promotion: number;
  description: string;
  startDate: string;
  endDate: string;
  discountPercentage: number;
  createdAt: string;
  updatedAt: string;
}


export interface PromotionPayload {
  description: string;
  startDate: string;
  endDate: string;
  discountPercentage: number;
}
