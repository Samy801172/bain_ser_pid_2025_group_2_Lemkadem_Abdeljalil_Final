// src/model/Product/product.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { Type } from '../Type/type.entity';
import { Promotion } from '../Promotion/promotion.entity';
import { PromotionModule } from '../Promotion/promotion.module';
import { TypeModule } from '../Type/type.module';

/**
 * Module de gestion des produits
 * Configure les dépendances pour la gestion du catalogue produits
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Type, Promotion]),
    PromotionModule, // Pour la gestion des promotions
    TypeModule      // Pour la gestion des types de produits
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}