// src/dto/update-invoice.dto.ts
export class UpdateInvoiceDto {
  orderId?: number;
  totalAmount?: number;
  issueDate?: string;
  billingAddress?: string;
  paymentStatus?: string;
  invoiceNumber?: string;
  clientName?: string;
}
