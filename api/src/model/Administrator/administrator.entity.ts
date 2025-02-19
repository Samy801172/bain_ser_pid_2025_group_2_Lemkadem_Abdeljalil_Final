import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../User/user.entity';
import { Appointment } from 'model/Appointment/appointment.entity';

@Entity()
export class Administrator {
  @PrimaryGeneratedColumn()
  adminId: number;

  @OneToOne(() => User, (user) => user.administrator)
  @JoinColumn()
  user: User;
  @OneToMany(() => Appointment, (appointment) => appointment.administrator)
  appointments: Appointment[];

}
