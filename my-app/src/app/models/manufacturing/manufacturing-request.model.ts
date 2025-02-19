export interface ManufacturingRequest {
  type: string;
  description: string;
  instructions?: string;
  prescriptionFile?: File;
}

export interface ManufacturingResponse {
  id: number;
  type: string;
  description: string;
  instructions: string;
  prescriptionPath?: string;
  status: string;
  createdAt: Date;
} 