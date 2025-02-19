// src/model/User/user.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

import { ClientController } from '../Client/client.controller';
import { UserController } from './user.controller';
import { AdministratorModule } from 'model/Administrator/administrator.module';
import { SecurityModule } from '@feature/security';
import { ClientService } from '../Client/client.service';
import { ClientModule } from 'model/Client/client.module';
import { UserService } from './user.service';

/**
 * Module de gestion des utilisateurs
 * Configure les dépendances pour l'authentification et la gestion des utilisateurs
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AdministratorModule), // Gestion des dépendances circulaires
    SecurityModule,                        // Pour l'authentification
    ClientModule,                          // Pour la gestion des clients
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule], // Export pour utilisation dans d'autres modules
})
export class UserModule {}
