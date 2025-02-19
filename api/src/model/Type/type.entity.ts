// src/model/type.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../Product/product.entity';

@Entity('type')
export class Type {
  @PrimaryGeneratedColumn()
  id_type: number;

  @Column()
  name: string; // Nom du type de produit

  @OneToMany(() => Product, (product) => product.type)
  products: Product[]; // Relation avec les produits
}
