import { ProductPromotion } from 'model/ProductPromotion/productPromotion.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('promotion')
export class Promotion {
  @ApiProperty({ description: 'Identifiant unique de la promotion' })
  @PrimaryGeneratedColumn()
  id_promotion: number;

  @ApiProperty({ description: 'Description de la promotion' })
  @Column({
    length: 255,
    nullable: false
  })
  description: string;

  @ApiProperty({ description: 'Date de début de la promotion' })
  @Column({
    type: 'timestamp',
    nullable: false
  })
  startDate: Date;

  @ApiProperty({ description: 'Date de fin de la promotion' })
  @Column({
    type: 'timestamp',
    nullable: false
  })
  endDate: Date;

  @ApiProperty({
    description: 'Pourcentage de réduction',
    minimum: 0,
    maximum: 100
  })
  @Column({
    type: 'int',
    nullable: false
  })
  discountPercentage: number;

  @ApiProperty({ description: 'Relations avec les produits en promotion' })
  @OneToMany(
    () => ProductPromotion,
    (productPromotion) => productPromotion.promotion,
    {
      cascade: true
    }
  )
  productPromotions: ProductPromotion[];

  @ApiProperty({ description: 'Date de création de la promotion' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Date de dernière modification de la promotion' })
  @UpdateDateColumn()
  updatedAt: Date;
}