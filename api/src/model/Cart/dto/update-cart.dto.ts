// src/dto/update-cart.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsOptional, IsInt, Min, IsNumber } from 'class-validator';

export class UpdateCartDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({ description: "La nouvelle quantité" })
  quantity: number;
}
