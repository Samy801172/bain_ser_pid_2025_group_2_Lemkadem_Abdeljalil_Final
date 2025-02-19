export interface Deposit {
  id: number;
  orderId: number;
  amount: number;
  paymentId: string;
  paymentMethod: 'paypal' | 'stripe' | 'bancontact';
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
}

export interface DepositRequest {
  orderId: number;
  amount: number;
  paymentMethod: 'paypal' | 'stripe';
}

export interface DepositPayment {
  orderId: number;
  amount: number;
  paymentMethod: 'PAYPAL' | 'STRIPE';
  paymentData: any;
}

export interface DepositResponse {
  success: boolean;
  transactionId: string;
  amount: number;
  status: string;
}

export interface CustomMedicationOrder {
  id: number;
  description: string;
  prescriptionFile: string;
  specialInstructions?: string;
  status: 'pending' | 'in_progress' | 'quality_check' | 'completed';
  depositStatus: 'pending' | 'paid';
  totalAmount: number;
  depositAmount: number;
}

export const DEPOSIT_PERCENTAGE = 30; // 30% d'acompte 