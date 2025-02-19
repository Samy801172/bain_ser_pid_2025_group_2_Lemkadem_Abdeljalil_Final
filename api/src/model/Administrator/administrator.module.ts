// src/model/Administrator/administrator.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorService } from './administrator.service';
import { UserModule } from '../User/user.module'; // Importez le UserModule
import { AdministratorController } from './administrator.controller';
import { Administrator } from './administrator.entity';

/**
 * Module de gestion des administrateurs
 * Configure les dépendances et les services nécessaires
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Administrator]),
    UserModule,
    forwardRef(() => UserModule), // Utilisation de forwardRef pour éviter les dépendances circulaires
  ],
  controllers: [AdministratorController],
  providers: [AdministratorService],
  exports: [AdministratorService, TypeOrmModule.forFeature([Administrator])],
})
export class AdministratorModule {}
