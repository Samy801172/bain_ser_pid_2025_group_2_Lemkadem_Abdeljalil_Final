// src/model/Payment/dto/update-payment.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  // Pas besoin d'ajouter des décorateurs ici car PartialType les copie
  // automatiquement depuis CreatePaymentDto en les rendant optionnels
}