// src/modules/service.module.ts

// Import des dépendances nécessaires
import { Module } from '@nestjs/common'; // Décorateur Module de NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Module TypeORM pour la gestion de la BDD
import { ServiceService } from './service.service'; // Service contenant la logique métier
import { ServiceController } from './service.controller'; // Contrôleur pour gérer les routes HTTP 
import { Service } from './service.entity'; // Entité TypeORM représentant un service en BDD

// Déclaration du module Service
// Le décorateur @Module configure le module avec ses dépendances
@Module({
 // Importation des modules requis
 imports: [
   // Configure TypeORM pour gérer l'entité Service
   TypeOrmModule.forFeature([Service])
 ],
 // Déclaration des services (providers) disponibles dans ce module
 providers: [ServiceService],
 // Déclaration des contrôleurs appartenant à ce module
 controllers: [ServiceController],
})
export class ServiceModule {} // Module exporté pour être importé dans d'autres modules
