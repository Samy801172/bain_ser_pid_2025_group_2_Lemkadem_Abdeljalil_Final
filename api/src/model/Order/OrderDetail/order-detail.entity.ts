import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../order.entity";
import { Product } from "model/Product/product.entity";

@Entity('order_detail')
export class OrderDetail {
  @PrimaryGeneratedColumn({ name: 'id_detail_commande' })
  id: number;

  @Column({ name: 'order_id' })
  orderId: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column()
  quantity: number;

  @Column({ name: 'unit_price', type: 'numeric', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ name: 'original_price', type: 'numeric', precision: 10, scale: 2 })
  originalPrice: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}