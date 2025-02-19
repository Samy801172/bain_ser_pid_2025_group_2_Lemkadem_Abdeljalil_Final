// models/order/order-detail.model.ts
import {ProductWithPromotion} from '../product/product.model';

export interface OrderDetail {
  id?: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product?: ProductWithPromotion;
}

export interface OrderDetailWithQuantity extends OrderDetail {
  oldQuantity?: number;
}

