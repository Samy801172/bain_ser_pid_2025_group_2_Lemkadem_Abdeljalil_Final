export interface Product {
  id: number;
  id_product?: number; // pour la compatibilité avec l'ancien code
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock?: number;
  activePromotion?: {
    id: number;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
  };
} 