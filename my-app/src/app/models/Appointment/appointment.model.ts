// models/appointment/appointment.model.ts
import { AppointmentStatus } from './appointment-types';
import { Client } from '../client/client.model';
import {Service} from '../Service/service.model';



export interface Appointment {
  appointmentId: number;
  appointmentDate: Date;
  time: string;
  status: AppointmentStatus; // Utilisation de l'enum ici
  clientId: number;
  serviceId: number;
  administratorId: number;
  notes?: string;
  client?: Client;
  service?: Service;
}
