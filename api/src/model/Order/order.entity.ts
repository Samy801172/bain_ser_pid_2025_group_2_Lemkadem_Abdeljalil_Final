// src/model/Order/order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Client } from '../Client/client.entity';
import { OrderStatusEntity } from '../OrderStatus/orderStatus.entity';
import { Invoice } from '../Invoice/invoice.entity';
import { OrderDetail } from './OrderDetail/order-detail.entity';
import { Payment } from '../Payment/payment.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn({ name: 'id_order' })
  id: number;

  @Column({ name: 'id_client' })
  id_client: number;

  @Column({ name: 'id_statut' })
  id_statut: number;

  @Column({ name: 'orderDate', type: 'timestamp' })
  orderDate: Date;

  @Column({ name: 'montant_total', type: 'numeric' })
  totalAmount: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'id_client' })
  client: Client;

  @ManyToOne(() => OrderStatusEntity)
  @JoinColumn({ name: 'id_statut' })
  status: OrderStatusEntity;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
  orderDetails: OrderDetail[];

  @OneToMany(() => Invoice, (invoice) => invoice.order)
  invoices: Invoice[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
