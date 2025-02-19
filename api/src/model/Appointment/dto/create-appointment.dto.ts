// src/dto/create-appointment.dto.ts
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @ApiProperty()
  appointmentDate: Date;
  @IsNotEmpty()
  @ApiProperty()
  time: string;
  @IsNotEmpty()
  @ApiProperty()
  serviceId: number;
  @IsNotEmpty()
  @ApiProperty()
  clientId: number;
  @IsNotEmpty()
  @ApiProperty()
  administratorId: number;
  @IsNotEmpty()
  @ApiProperty()
  status: string;
}
