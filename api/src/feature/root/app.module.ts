import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configManager } from '@common/config';
import { Client } from '../../model/Client/client.entity';
import { typeOrmConfig } from '@common/config/typeorm.config';

// Modules de fonctionnalités
import { SecurityModule } from '@feature/security';

// Modules métier
import { AdministratorModule } from 'model/Administrator/administrator.module';
import { ClientModule } from 'model/Client/client.module';
import { UserModule } from 'model/User/user.module';
import { ProductModule } from 'model/Product/product.module';
import { TypeModule } from 'model/Type/type.module';
import { CartModule } from 'model/Cart/cart.module';
import { OrderModule } from 'model/Order/order.module';
import { OrderStatusModule } from 'model/OrderStatus/orderStatus.module';
import { ServiceModule } from 'model/Service/service.module';
import { AppointmentModule } from 'model/Appointment/appointment.module';
import { PromotionModule } from 'model/Promotion/promotion.module';
import { InvoiceModule } from 'model/Invoice/invoice.module';
import { ManufacturingModule } from 'model/Manufacturing/manufacturing.module';

// Entités (si nécessaire pour TypeORM.forFeature)
import { Service } from 'model/Service/service.entity';
import { Appointment } from 'model/Appointment/appointment.entity';
import { OrderDetailModule } from 'model/Order/OrderDetail/order-detail.module';
import { StockModule } from 'model/Stock/stock.module';
import { Payment } from '../../model/Payment/payment.entity';
import { ManufacturingCustomRequest } from '../../model/Manufacturing/entities/manufacturing-custom-request.entity';
import { PaymentModule } from '../../model/Payment/payment.module';
import { PrescriptionModule } from '../../model/Prescription/prescription.module';
import { Manufacturing } from 'model/Manufacturing/manufacturing.entity';
import { Order } from 'model/Order/order.entity';
import { OrderStatusEntity } from 'model/OrderStatus/orderStatus.entity';
import { Cart } from 'model/Cart/cart.entity';
import { Product } from 'model/Product/product.entity';
import { Type } from 'model/Type/type.entity';
import { Invoice } from 'model/Invoice/invoice.entity';
import { Administrator } from 'model/Administrator/administrator.entity';
import { User } from 'model/User/user.entity';
import { GoogleModule } from '@feature/security/google/google.module';

@Module({
  imports: [
    // Configuration TypeORM
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([
      Service,
      Appointment,
      Client,
      Payment,
      ManufacturingCustomRequest,
      Manufacturing,
      Order,
      OrderStatusEntity,
      Cart,
      Product,
      Type,
      Invoice,
      Administrator,
      User
    ]),

    // Module de sécurité
    SecurityModule,
    ClientModule,

    // Modules utilisateurs
    UserModule,
    ClientModule,
    AdministratorModule,

    // Modules produits et catalogue
    ProductModule,
    TypeModule,
    CartModule,
    PromotionModule,
    StockModule,
    PaymentModule,
    PrescriptionModule,

    // Modules commandes et facturation
    OrderModule,
    OrderStatusModule,
    OrderDetailModule,
    InvoiceModule,

    // Modules services et rendez-vous
    ServiceModule,
    AppointmentModule,
    ManufacturingModule,
    GoogleModule,
  ],
})
export class AppModule {}
