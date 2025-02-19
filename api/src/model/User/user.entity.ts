import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Client } from '../Client/client.entity';
import { Administrator } from '../Administrator/administrator.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  firstName: string;
  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  @Column({ default: false }) // par défaut, l'utilisateur n'est pas admin
  isAdmin: boolean;

  // Relation avec Client
  @OneToOne(() => Client, (client) => client.user, { nullable: true }) // Nullable au cas où l'utilisateur serait un admin
  client: Client;

  // Relation avec Administrator
  @OneToOne(() => Administrator, (admin) => admin.user, { nullable: true }) // Nullable au cas où l'utilisateur serait un client
  administrator: Administrator;
}
