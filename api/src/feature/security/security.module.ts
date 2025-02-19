// security.module.ts
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reflector } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

// Services
import { SecurityService, TokenService } from './service';

// Entities
import { Credential, Token } from './data';
import { Client } from '../../model/Client/client.entity';

// Guards & Strategy
import { JwtGuard } from './guard';
import { JwtStrategy } from './strategy/jwt.strategy';

// Configuration
import { configManager } from '@common/config';
import { ConfigKey } from '@common/config/enum';

// Controller
import { SecurityController } from './security.controller';
import { ClientModule } from '../../model/Client/client.module';
import { ClientService } from '../../model/Client/client.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleModule } from './google/google.module';

/**
 * Module de sécurité principal
 * Configure l'authentification et l'autorisation de l'application
 */
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Credential, Token, Client]),
    // Configuration de Passport avec JWT comme stratégie par défaut
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // Configuration du module JWT avec les options de base
    JwtModule.register({
      secret: process.env.JWT_TOKEN_SECRET || process.env.JWT_SECRET,
      signOptions: { 
        expiresIn: process.env.JWT_TOKEN_EXPIRE_IN || '24h' 
      },
    }),
    ClientModule,
    GoogleModule
  ],
  // Déclaration des services et guards disponibles dans le module
  providers: [
    SecurityService,
    TokenService,
    JwtGuard,
    JwtStrategy,
    Reflector,
    ClientService
  ],
  controllers: [SecurityController],
  // Export des services et modules nécessaires aux autres modules
  exports: [SecurityService, JwtGuard, JwtModule, PassportModule, TokenService],
})
export class SecurityModule {}