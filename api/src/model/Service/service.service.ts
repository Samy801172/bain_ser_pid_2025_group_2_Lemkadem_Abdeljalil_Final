// src/model/Service/service.service.ts

// Import des dépendances NestJS et TypeORM nécessaires
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from 'model/Service/dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

// Service injectable qui gère les opérations CRUD pour l'entité Service
@Injectable()
export class ServiceService {
 // Injection du repository Service via le constructeur
 // Le repository permet d'interagir avec la table services en base de données
 constructor(
   @InjectRepository(Service)
   private readonly serviceRepository: Repository<Service>,
 ) {}

 // Création d'un nouveau service
 // Prend en paramètre un DTO contenant les données du service à créer
 async create(createServiceDto: CreateServiceDto): Promise<Service> {
   // Crée une nouvelle instance de Service avec les données du DTO
   const service = this.serviceRepository.create(createServiceDto);
   // Sauvegarde en base de données et retourne le service créé
   return await this.serviceRepository.save(service);
 }

 // Récupère tous les services de la base de données
 async findAll(): Promise<Service[]> {
   return await this.serviceRepository.find();
 }

 // Récupère un service spécifique par son ID
 // Lève une exception si le service n'est pas trouvé
 async findOne(id: number): Promise<Service> {
   const service = await this.serviceRepository.findOne({
     where: { id: id }
   });
   if (!service) {
     throw new NotFoundException(`Service #${id} not found`);
   }
   return service;
 }

 // Met à jour un service existant
 // Prend en paramètre l'ID du service et les données à mettre à jour
 async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {
   // Vérifie d'abord l'existence du service
   const service = await this.findOne(id);
   // Met à jour les propriétés du service avec les nouvelles valeurs
   Object.assign(service, updateServiceDto);
   try {
     // Sauvegarde les modifications en base de données
     return await this.serviceRepository.save(service);
   } catch (error) {
     // Log l'erreur avant de la propager
     console.error('Error updating service:', error);
     throw error;
   }
 }

 // Supprime un service de la base de données
 // Vérifie d'abord l'existence du service avant la suppression
 async remove(id: number): Promise<void> {
   const service = await this.findOne(id);
   await this.serviceRepository.remove(service);
 }
}