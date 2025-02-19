// src/app/models/create-cart.dto.ts
export interface CreateCartDto {
  clientId: number;
  productId: number;
  quantity: number;
  productName: string;
}
