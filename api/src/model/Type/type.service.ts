import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './type.entity';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable() // Déclare ce service comme injectable dans NestJS
export class TypeService {
  constructor(
    @InjectRepository(Type) // Injecte le repository TypeORM pour l'entité Type
    private readonly typeRepository: Repository<Type>,
  ) {}

  async create(createTypeDto: CreateTypeDto): Promise<Type> {
    const type = this.typeRepository.create(createTypeDto); // Crée une nouvelle entité Type
    return this.typeRepository.save(type); // Sauvegarde l'entité dans la base de données
  }

  async findAll(): Promise<Type[]> {
    return this.typeRepository.find({ relations: ['products'] }); // Récupère tous les types avec leurs relations avec les produits
  }

  async findOne(id: number): Promise<Type> {
    const type = await this.typeRepository.findOne({
      where: { id_type: id }, // Recherche un Type par ID
      relations: ['products'], // Inclut les relations avec les produits
    });
    if (!type) {
      throw new NotFoundException(`Type with ID ${id} not found`); // Lève une exception si aucun Type n'est trouvé
    }
    return type;
  }

  async update(id: number, updateTypeDto: UpdateTypeDto): Promise<Type> {
    const type = await this.findOne(id); // Récupère l'entité existante
    Object.assign(type, updateTypeDto); // Met à jour ses propriétés avec les nouvelles valeurs
    return this.typeRepository.save(type); // Sauvegarde les modifications dans la base de données
  }

  async remove(id: number): Promise<void> {
    const type = await this.findOne(id); // Vérifie que l'entité existe avant suppression
    await this.typeRepository.remove(type); // Supprime l'entité de la base de données
  }
}
