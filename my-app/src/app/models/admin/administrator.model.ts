// models/interfaces/administrator.model.ts
import {Appointment} from '../Appointment/appointment.model';
import {User} from '../user/user.model';

export interface Administrator {
  adminId: number;
  user: User;
  appointments: Appointment[];
}
