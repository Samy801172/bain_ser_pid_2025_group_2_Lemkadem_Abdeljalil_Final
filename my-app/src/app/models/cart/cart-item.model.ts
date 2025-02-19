import {Promotion} from '../product/product.model';

export interface CartItem {
  id: number;
  unit_price: number;
  productId: number;
  quantity: number;
  product: {
    id_product: number;
    promotion?: Promotion;
    name: string;
    price: number   // Prix avec promotion si applicable
    appliedPromotionId?: number;
    stock: number;
    description?: string;
    activePromotion?: { startDate: Date;
      endDate:Date;
      discountPercentage: number;
      description: string;


    };
  };
}
