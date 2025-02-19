// src/model/OrderStatus/orderStatus.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusController } from './orderStatus.controller';
import { OrderStatusService } from './orderStatus.service';
import { OrderStatusEntity } from './orderStatus.entity';

/**
 * Module de gestion des statuts de commande
 * Fournit les fonctionnalités de suivi des états des commandes
 */
@Module({
  imports: [TypeOrmModule.forFeature([OrderStatusEntity])],
  controllers: [OrderStatusController],
  providers: [OrderStatusService],
  exports: [OrderStatusService]
})
export class OrderStatusModule {}