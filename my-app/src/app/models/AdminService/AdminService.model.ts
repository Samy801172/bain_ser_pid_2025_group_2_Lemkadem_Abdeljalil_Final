import {Observable} from 'rxjs';
import {Appointment} from '../Appointment/appointment.model';

interface AdminService {
  getAllAppointments(): Observable<Appointment[]>;
  getClients(): Observable<any[]>;
  getServices(): Observable<any[]>;
  createAppointment(data: any): Observable<Appointment>;
  updateAppointment(id: number, data: any): Observable<Appointment>;
  updateAppointmentStatus(id: number, status: string): Observable<void>;
}
