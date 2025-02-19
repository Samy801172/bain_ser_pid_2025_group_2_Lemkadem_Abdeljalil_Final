// models/product/product.model.ts
export interface Product {
  id_product: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  active: boolean;
  imageUrls: string[];
  typeId?: number;
  promotion?: {
    id_promotion: number;
    description: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date
    promotion?: Promotion;  // Promotion actuelle du produit
  };
}

export interface Promotion {
  id_promotion: number;
  description: string;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
}

export interface NewProduct {
  name: string;
  description: string;
  stock: number;
  price: number;
  active: boolean;
  typeId?: number;
  imageUrls?: string[];
}

export interface ProductWithPromotion extends Product {
  activePromotion?: {
    id_promotion: number;
    description: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
  };
  promotionPrice?: number;
}
