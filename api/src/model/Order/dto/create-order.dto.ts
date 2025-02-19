import { IsArray, IsNotEmpty, ValidateNested, IsNumber, IsOptional, IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class OrderProductDto {
  @ApiProperty()
  @IsNumber()
  id_product: number;

  @ApiProperty()
  @IsNumber()
  price: number;
}

class OrderItemDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => OrderProductDto)
  product: OrderProductDto;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  cartItems: OrderItemDto[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  id_statut?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  orderDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paypalOrderId?: string;
}