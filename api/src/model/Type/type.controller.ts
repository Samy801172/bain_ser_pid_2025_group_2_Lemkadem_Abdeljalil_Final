// src/controllers/type.controller.ts

// Import des décorateurs et utilitaires de NestJS pour la gestion des requêtes HTTP
// et la validation des données
import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, HttpStatus, BadRequestException } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
// Import des décorateurs Swagger pour la documentation de l'API
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// Décorateur pour regrouper les endpoints dans la documentation Swagger
@ApiTags('types')
// Décorateur indiquant que l'authentification par token Bearer est requise
@ApiBearerAuth('access-token')
// Définit la route de base 'types' pour tous les endpoints de ce contrôleur
@Controller('types')
export class TypeController {
 // Injection du service TypeService qui contient la logique métier
 constructor(private readonly typeService: TypeService) {}

 // Endpoint pour créer un nouveau type
 // POST /types
 @Post()
 create(@Body() createTypeDto: CreateTypeDto) {
   return this.typeService.create(createTypeDto);
 }

 // Endpoint pour récupérer tous les types
 // GET /types
 @Get()
 findAll() {
   return this.typeService.findAll();
 }

 // Endpoint pour récupérer un type spécifique par son ID
 // GET /types/:id
 @Get(':id')
 findOne(@Param('id') id: string) {
   // Conversion de l'ID en nombre avant de le passer au service
   return this.typeService.findOne(+id);
 }

 // Endpoint pour mettre à jour un type existant
 // PUT /types/:id
 @Put(':id')
 update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
   // Conversion de l'ID en nombre avant de le passer au service
   return this.typeService.update(+id, updateTypeDto);
 }

 // Endpoint pour supprimer un type
 // DELETE /types/:id
 // Utilise ParseIntPipe avec une configuration personnalisée pour la validation de l'ID
 @Delete(':id')
 async remove(@Param('id', new ParseIntPipe({
   errorHttpStatusCode: HttpStatus.BAD_REQUEST,
   exceptionFactory: () => new BadRequestException('ID invalide')
 })) id: number) {
   return this.typeService.remove(id);
 }
}