import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BeforeUpdate, ManyToMany, JoinTable } from 'typeorm';
import { Type } from '../Type/type.entity';
import { Cart } from '../Cart/cart.entity';
import { ProductPromotion } from 'model/ProductPromotion/productPromotion.entity';
import { ApiProperty } from '@nestjs/swagger';
import { OrderDetail } from 'model/Order/OrderDetail/order-detail.entity';
import { Promotion } from '../Promotion/promotion.entity'; // Import de Promotion

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id_product: number;

  @Column()
  name: string; // Nom du produit

  @Column()
  description: string; // Description du produit

  @Column()
  stock: number; // Quantité en stock

  @Column('decimal')
  price: number; // Prix du produit

  @Column({ default: true })
  active: boolean; // Si le produit est actif ou non

  @ManyToOne(() => Type, (type) => type.products)
  type: Type; // Clé étrangère vers le type de produit

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[]; // Relation avec Cart

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[]; // Un produit peut avoir plusieurs détails de commande

  @OneToMany(() => ProductPromotion, (productPromotion) => productPromotion.product)
  productPromotions: ProductPromotion[];

  @ManyToOne(() => Promotion, { nullable: true }) // Relation avec Promotion (nullable)
  promotion: Promotion | null; // Promotion appliquée, s'il y en a une
  @Column({ default: false })
  @ApiProperty()
  requiresPrescription: boolean;

  @Column({ default: false })
  @ApiProperty()
  requiresManufacturing: boolean;

  @BeforeUpdate()
  validateStock() {
    if (this.stock < 0) {
      throw new Error('Le stock ne peut pas être négatif');

    }
  }

  @ManyToMany(() => Promotion)
  @JoinTable({
    name: 'product_promotion',
    joinColumn: { name: 'product_id', referencedColumnName: 'id_product' },
    inverseJoinColumn: { name: 'promotion_id', referencedColumnName: 'id_promotion' }
  })
  promotions: Promotion[];


}

