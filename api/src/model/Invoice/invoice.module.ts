// src/modules/invoice.module.ts
// src/model/Invoice/invoice.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { Order } from '../Order/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Order])],
  controllers: [], // Ajoutez votre controller si nécessaire
  providers: [], // Ajoutez votre service si nécessaire
  exports: []
})
export class InvoiceModule {}
