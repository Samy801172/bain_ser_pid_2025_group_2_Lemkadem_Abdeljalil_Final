// src/dto/create-invoice.dto.ts
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceDto {
  @IsNotEmpty()
  @ApiProperty()
  orderId: number;
  @IsNotEmpty()
  @ApiProperty()
  totalAmount: number;
  @IsNotEmpty()
  @ApiProperty()
  issueDate: string;
  @IsNotEmpty()
  @ApiProperty()
  billingAddress: string;
  @IsNotEmpty()
  @ApiProperty()
  paymentStatus: string;
  @IsNotEmpty()
  @ApiProperty()
  invoiceNumber: string;
  @IsNotEmpty()
  @ApiProperty()
  clientName: string;
}
