// models/order/order.model.ts
import {Client} from '../client/client.model';

export interface NewOrder {
  clientId: number;
  orderLines: {
    id_product: number;
    quantity: number;
    unit_price: number;
  }[];
  payment?: {
    method: string;
    transactionId: string;
    amount: number;
    status: string;
  };
}

export interface Order {
  id_order: number;
  date_order: Date;
  id_statut: number;
  id_client: number;
  montant_total: number;
  orderDetails: OrderDetail[];
  client?: {
    firstName: string;
    lastName: string;
    address: string;
  };

  promotions?: {
    id: number;
    description: string;
    discount: number;
  }[];
  subtotal?: number;
  status?: string;
}

export interface OrderProduct {
  id_product: number;
  name: string;
  price: number;
  description?: string;
  stock?: number;
  active?: boolean;
}


export interface OrderDetail {
  id_order_detail: number; // Gardons le nom utilisé dans le composant pour l'instant
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  product: OrderProduct;
}
