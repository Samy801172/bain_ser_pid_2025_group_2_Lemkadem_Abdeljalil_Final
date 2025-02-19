
// src/model/OrderStatus/dto/update-orderStatus.dto.ts
import { IsEnum, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from './order-status.enum';


export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'Label du statut',
    enum: OrderStatus,
    example: OrderStatus.PENDING,
    required: false
  })
  @IsEnum(OrderStatus)
  @IsOptional()
  label?: OrderStatus;

  @ApiProperty({
    description: 'Description du statut',
    example: 'Commande en attente de paiement',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;
}
