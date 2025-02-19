// Importation des modules nécessaires de NestJS
import { Module } from '@nestjs/common'; // Module de base de NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // TypeOrmModule pour gérer la base de données avec TypeORM
import { AppointmentService } from './appointment.service'; // Service qui gère la logique métier des rendez-vous
import { AppointmentController } from './appointment.controller'; // Contrôleur qui gère les requêtes HTTP pour les rendez-vous
import { Appointment } from './appointment.entity'; // Entité Appointment qui représente un rendez-vous dans la base de données

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])], // Enregistre l'entité Appointment avec TypeORM pour qu'elle soit disponible dans ce module
  providers: [AppointmentService], // Ajoute AppointmentService dans les fournisseurs du module
  controllers: [AppointmentController], // Enregistre AppointmentController pour gérer les requêtes HTTP
})
export class AppointmentModule {} // Exportation du module Appointment
