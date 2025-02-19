import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../Product/product.entity';
import { Client } from '../Client/client.entity';
// import { CartItem } from '../CartItem/cartItem.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number;

  @ManyToOne(() => Client, client => client.carts)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  appliedPromotionId: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  // Commentons temporairement cette partie
  // @OneToMany(() => CartItem, cartItem => cartItem.cart, { eager: true })
  // items: CartItem[];
}