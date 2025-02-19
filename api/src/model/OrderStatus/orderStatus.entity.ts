// src/model/OrderStatus/orderStatus.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order_status')
export class OrderStatusEntity {
  @PrimaryGeneratedColumn({ name: 'id_status' })
  id: number;

  @Column()
  label: string;

  @Column()
  description: string;
}
