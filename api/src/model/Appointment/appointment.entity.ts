import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from '../Client/client.entity';
import { Administrator } from '../Administrator/administrator.entity';
import { Service } from '../Service/service.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  appointmentId: number;

  @Column()
  appointmentDate: Date;

  @Column()
  time: string;

  @ManyToOne(() => Service, (service) => service.appointments)
  service: Service;

  @ManyToOne(() => Client, (client) => client.appointments)
  client: Client;

  @ManyToOne(() => Administrator, (admin) => admin.appointments)
  administrator: Administrator;

  @Column()
  status: string;
}
