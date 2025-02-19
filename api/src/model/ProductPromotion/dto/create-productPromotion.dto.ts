// src/dto/create-productPromotion.dto.ts
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductPromotionDto {
  @IsNotEmpty()
  @ApiProperty()
  productId: number;
  @IsNotEmpty()
  @ApiProperty()
  promotionId: number;
}
