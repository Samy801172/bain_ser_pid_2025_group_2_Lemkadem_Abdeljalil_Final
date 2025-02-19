export interface CreatePromotionDto {
  id: number;
  description: string;
  startDate: Date;
  endDate: Date;
  discountPercentage: number;
}
