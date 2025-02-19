// src/model/OrderDetail/order-detail.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './order-detail.entity';

/**
 * Module de gestion des détails de commande
 * Fournit l'accès aux entités OrderDetail
 */
@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  exports: [TypeOrmModule]
})
export class OrderDetailModule {}