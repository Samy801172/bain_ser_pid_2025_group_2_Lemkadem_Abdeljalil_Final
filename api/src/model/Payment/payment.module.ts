// src/model/Payment/payment.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaypalService } from '../Paypal/paypal.service';
import { OrderService } from '../Order/order.service';
import { Payment } from './payment.entity';
import { Order } from '../Order/order.entity';
import { OrderStatusEntity } from '../OrderStatus/orderStatus.entity';
import { OrderDetail } from '../Order/OrderDetail/order-detail.entity';
import { Cart } from '../Cart/cart.entity';
import { Product } from '../Product/product.entity';
import { Client } from '../Client/client.entity';
import { CartModule } from '../Cart/cart.module';
import { OrderModule } from '../Order/order.module';
import { ClientModule } from '../Client/client.module';
import { ManufacturingModule } from '../Manufacturing/manufacturing.module';
import { ManufacturingCustomRequest } from '../Manufacturing/manufacturing-custom-request.entity';

/**
 * Module de gestion des paiements
 * Configure les dépendances pour le traitement des paiements et l'intégration PayPal
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forFeature([
      Payment,
      Order,
      OrderStatusEntity,
      OrderDetail,
      Cart,
      Product,
      Client,
      ManufacturingCustomRequest
    ]),
    CartModule,      // Pour la gestion du panier
    OrderModule,     // Pour la gestion des commandes
    HttpModule,      // Pour les appels API PayPal
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    ClientModule,    // Pour la gestion des clients
    ManufacturingModule  // Pour la gestion des fabrications
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaypalService, OrderService],
  exports: [PaymentService]
})
export class PaymentModule {}