import { Product } from "model/Product/product.entity";
import { Promotion } from "model/Promotion/promotion.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('product_promotion')
export class ProductPromotion {
  @PrimaryGeneratedColumn()
  id_product_promotion: number;

  @Column({ name: 'id_product', type: 'integer', nullable: false })
  id_product: number;

  @Column({ name: 'id_promotion', type: 'integer', nullable: false })
  id_promotion: number;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @ManyToOne(() => Promotion, { nullable: false })
  @JoinColumn({ name: 'id_promotion' })
  promotion: Promotion;
}