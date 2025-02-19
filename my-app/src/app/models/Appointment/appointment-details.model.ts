// models/Appointment/appointment-details.model.ts
export interface AppointmentDetails {
  appointmentId: number;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  duration: number; // en minutes
  status: AppointmentStatus;
  notes: string;

  // Relations
  clientId: number;
  client: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  serviceId: number;
  service: {
    name: string;
    price: number;
    duration: number;
  };

  administratorId: number;
  administrator: {
    firstName: string;
    lastName: string;
  };

  // Historique
  createdAt: Date;
  updatedAt: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
}

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}
