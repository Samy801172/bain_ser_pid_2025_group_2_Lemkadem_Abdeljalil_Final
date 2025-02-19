import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from '../order/order.entity';

@Entity('manufacturing')
export class Manufacturing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'PAYMENT_PENDING', 'PAID', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING'
  })
  status: string;

  @Column({ 
    type: 'enum',
    enum: ['capsules', 'sirop', 'pommade', 'cream'],
    default: 'capsules'
  })
  type: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  depositAmount: number; // Montant de l'acompte (30% par exemple)

  @Column({ nullable: true })
  prescriptionFile: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn() 
  updatedAt: Date;
} 