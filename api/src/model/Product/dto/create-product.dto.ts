// src/dto/create-product.dto.ts
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @ApiProperty()
  stock: number
  @IsNotEmpty()
  @ApiProperty()
  price: number;
  @IsNotEmpty()
  @ApiProperty()
  active: boolean;
  @IsNotEmpty()
  @ApiProperty()
  typeId: number;
}
