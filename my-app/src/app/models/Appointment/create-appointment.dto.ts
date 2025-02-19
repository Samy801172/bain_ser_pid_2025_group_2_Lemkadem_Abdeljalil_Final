// models/appointment/create-appointment.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsDate, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsNumber()
  clientId!: number;

  @IsNotEmpty()
  @IsNumber()
  serviceId!: number;

  @IsNotEmpty()
  @IsDate()
  appointmentDate!: Date;

  @IsNotEmpty()
  @IsString()
  time!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
