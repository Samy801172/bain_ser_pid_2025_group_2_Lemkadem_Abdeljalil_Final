// models/Service/create-service.dto.ts
export interface CreateServiceDto {
  name: string;
  description: string;
  duration: number;  // En nombre de minutes
  price: number;
}
