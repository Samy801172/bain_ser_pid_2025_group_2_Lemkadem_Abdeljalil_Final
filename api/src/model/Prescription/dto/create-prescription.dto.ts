// src/models/prescription/dto/create-prescription.dto.ts
import { IsNotEmpty, IsString, IsBoolean, IsNumber, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescriptionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  client_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  prescribed_by: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  medication_details: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  expiry_date?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  file_url?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: false })
  is_custom: boolean = false;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  notes?: string;
}