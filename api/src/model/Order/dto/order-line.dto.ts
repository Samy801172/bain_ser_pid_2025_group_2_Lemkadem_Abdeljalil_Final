import { IsNumber, IsOptional, Min } from "class-validator";

// DTO pour chaque ligne de commande
export class OrderLineDto {
  @IsNumber()
  id_product: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsOptional()
  unit_price?: number;

  @IsNumber()
  @IsOptional()
  original_price?: number;
}