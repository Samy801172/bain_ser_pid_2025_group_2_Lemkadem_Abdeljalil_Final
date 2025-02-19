// src/app/models/create-product.dto.ts
export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  quantityInStock: number;
  promotion?: boolean;
  quantity: number;
}
