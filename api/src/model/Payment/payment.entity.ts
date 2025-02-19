// payment.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from '../Order/order.entity';
import { PaymentMethodEnum, PaymentStatusEnum } from './payment.enum';
import { ManufacturingCustomRequest } from '../Manufacturing/entities/manufacturing-custom-request.entity';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'EUR' })
  currency: string;

  @Column({
    type: 'enum',
    enum: PaymentMethodEnum,
    default: PaymentMethodEnum.PAYPAL
  })
  paymentMethod: PaymentMethodEnum;

  @Column({
    type: 'enum',
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.PENDING
  })
  paymentStatus: PaymentStatusEnum;

  @Column({ nullable: true })
  paypalOrderId: string;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: false })
  isDeposit: boolean;

  @Column({ name: 'manufacturing_request_id', nullable: true })
  manufacturingRequestId: number;

  @ManyToOne(() => ManufacturingCustomRequest, { nullable: true })
  @JoinColumn({ name: 'manufacturing_request_id' })
  manufacturingRequest: ManufacturingCustomRequest;
}