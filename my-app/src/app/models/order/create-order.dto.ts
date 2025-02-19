export interface CreateOrderDto {
  id_client: number;     // Changé de clientId
  products: {
    id_product: number;  // Changé de productId
    quantity: number;
    unit_price: number;  // Ajouté pour correspondre au backend
  }[];
  montant_total: number; // Changé de totalAmount
}
