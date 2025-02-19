// src/model/Invoice/invoice.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from '../Order/order.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.invoices)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number; // Montant total de la facture

  @Column({ type: 'date' })
  issueDate: string; // Date de la facture

  @Column({ type: 'varchar', length: 255 })
  billingAddress: string; // Adresse de facturation

  @Column({ type: 'varchar', length: 255, nullable: true })
  paymentStatus: string; // Statut du paiement (ex: "paid", "pending", "overdue")

  @Column({ type: 'varchar', length: 50 })
  invoiceNumber: string; // Numéro de la facture

  @Column({ type: 'varchar', length: 255 })
  clientName: string; // Nom du client
}
