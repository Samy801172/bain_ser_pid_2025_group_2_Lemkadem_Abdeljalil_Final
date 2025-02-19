// src/dto/update-appointment.dto.ts
export class UpdateAppointmentDto {
  appointmentDate?: Date;
  time?: string;
  serviceId?: number;
  clientId?: number;
  administratorId?: number;
  status?: string;
}
