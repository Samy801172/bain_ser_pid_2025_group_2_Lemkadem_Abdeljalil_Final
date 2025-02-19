// models/interfaces/invoice.model.ts


import {Order} from '../order/order.model';

export interface Invoice {
  id: number;
  order: Order;
  totalAmount: number;
  issueDate: string;
  billingAddress: string;
  paymentStatus: string;
  invoiceNumber: string;
  clientName: string;
}
