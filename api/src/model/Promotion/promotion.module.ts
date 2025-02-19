// src/module/promotion/promotion.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { Promotion } from 'model/Promotion/promotion.entity'; // Chemin vers l'entité Promotion

@Module({
  imports: [TypeOrmModule.forFeature([Promotion])],
  providers: [PromotionService],
  controllers: [PromotionController],
  exports: [PromotionService,TypeOrmModule, PromotionService],
})
export class PromotionModule {}

