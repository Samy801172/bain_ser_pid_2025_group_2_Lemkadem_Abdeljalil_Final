export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product?: {
    name: string;
    description: string;
    price: number;
  };
}
