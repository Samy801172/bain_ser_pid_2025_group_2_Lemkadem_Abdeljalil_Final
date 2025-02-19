// src/model/OrderStatus/dto/create-orderStatus.dto.ts
import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from './order-status.enum';


export class CreateOrderStatusDto {
  @ApiProperty({
    description: 'Label du statut',
    enum: OrderStatus,
    example: OrderStatus.PENDING
  })
  @IsEnum(OrderStatus)
  label: OrderStatus;

  @ApiProperty({
    description: 'Description du statut',
    example: 'Commande en attente de paiement'
  })
  @IsString()
  description: string;
}