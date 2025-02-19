// models/Service/service.model.ts
export interface Service {
  id: number;  // Pour maintenir la compatibilité
  name: string;
  description: string;
  duration: number;  // En nombre de minutes
  price: number;
  active?: boolean;
}
