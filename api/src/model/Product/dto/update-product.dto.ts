// src/model/Product/dto/update-product.dto.ts
import { IsOptional, IsNumber, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  stock?: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price?: number;
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active?: boolean;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  typeId?: number;
}