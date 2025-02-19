
// models/client/client.model.ts
import { User } from '../user/user.model';

import { Order } from '../order/order.model';
import { Cart } from '../cart/cart.model';
import {Appointment} from '../Appointment/appointment.model';

export interface Client {
  clientId: number;
  address: string;
  firstName: string;
  lastName: string;
  user: User;
  orders?: Order[];
  appointments?: Appointment[];
  carts?: Cart[];
}
