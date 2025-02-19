export type ManufacturingStatus = 'pending' | 'in_progress' | 'quality_check' | 'completed';

export interface Prescription {
  type: 'cream' | 'capsules' | 'other';
  components: string[];
  complexity: 'low' | 'normal' | 'high';
}

export interface CreateCustomMedicationDto {
  description: string;
  instructions?: string;
  estimatedPrice: number;
}

export interface CustomMedicationResponse {
  id: number;
  description: string;
  instructions?: string;
  estimatedPrice: number;
  prescriptionPath?: string;
  status: ManufacturingStatus;
  isPaid: boolean;
  amount: number;
  createdAt: Date;
  clientId: number;
} 