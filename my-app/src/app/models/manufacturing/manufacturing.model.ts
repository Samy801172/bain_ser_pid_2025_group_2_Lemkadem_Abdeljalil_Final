export enum ManufacturingStatus {
  EN_ATTENTE_ACOMPTE = 'EN_ATTENTE_ACOMPTE',
  ACOMPTE_PAYE = 'ACOMPTE_PAYE',
  EN_FABRICATION = 'EN_FABRICATION',
  PRET = 'PRET',
  TERMINE = 'TERMINE'
}

export interface Manufacturing {
  id: number;
  clientId: number;
  clientName?: string;
  type: string;
  description: string;
  instructions?: string;
  prescriptionPath?: string;
  totalPrice: number;
  deposit: number;
  status: ManufacturingStatus;
  statusText?: string;
  statusClass?: string;
  createdAt: Date;
  updatedAt: Date;
  orderId?: number;
  estimatedPrice?: number;
  estimatedCompletionDate?: Date;
  notes?: string;
  prescriptionDetails?: any;
}

export interface QualityCheck {
  id: number;
  manufacturingId: number;
  checkDate: Date;
  parameter: string;
  result: string;
  passed: boolean;
  notes?: string;
}

export interface ManufacturingUpdate {
  status?: ManufacturingStatus;
  notes?: string;
  estimatedEndDate?: Date;
}

export interface ManufacturingDetails extends Manufacturing {
  order?: {
    id_order: number;
    clientId: number;
    totalAmount: number;
    status: string;
  };
}

export interface StockAvailability {
  available: boolean;
  missingItems?: string[];
} 