// models/appointment/appointment-types.ts
export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  NOSHOW = 'noshow'
}

// Vous pouvez aussi ajouter d'autres types liés aux rendez-vous ici
export interface AppointmentTime {
  hour: string;
  available: boolean;
}

export type AppointmentFilters = {
  status?: AppointmentStatus;
  date?: string;
  clientName?: string;
}
