// src/dto/update-order.dto.ts
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { Type } from 'class-transformer';
import { OrderLineDto } from './order-line.dto';

export class UpdateOrderDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  orderDate?: Date;

  @IsOptional()
  @IsNumber()
  statusId?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderLineDto)
  orderLines?: OrderLineDto[];

  @IsOptional()
  @IsNumber()
  montant_total?: number;

  // Si vous avez besoin d'autres champs optionnels
  @IsOptional()
  @IsNumber()
  clientId?: number;

  @IsOptional()
  paymentInfo?: any;
}