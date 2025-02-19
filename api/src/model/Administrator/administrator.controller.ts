// src/controllers/administrator.controller.ts
import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Administrator } from './administrator.entity';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { AdministratorService } from './administrator.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

/**
 * Contrôleur pour la gestion des administrateurs
 * Fournit les endpoints CRUD pour les administrateurs
 */
@ApiTags('administrators')
@Controller('administrators')
//@ApiBearerAuth('access-token') // Indique que ce contrôleur nécessite un token d'accès
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  /**
   * Crée un nouvel administrateur
   * @param createAdministratorDto - DTO contenant les données de l'administrateur
   */
  @Post()
  async create(@Body() createAdministratorDto: CreateAdministratorDto): Promise<Administrator> {
    return this.administratorService.create(createAdministratorDto);
  }

  /**
   * Récupère tous les administrateurs
   */
  @Get()
  async findAll(): Promise<Administrator[]> {
    return this.administratorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Administrator> {
    return this.administratorService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateAdministratorDto: UpdateAdministratorDto): Promise<Administrator> {
    return this.administratorService.update(id, updateAdministratorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.administratorService.remove(id);
  }
}
