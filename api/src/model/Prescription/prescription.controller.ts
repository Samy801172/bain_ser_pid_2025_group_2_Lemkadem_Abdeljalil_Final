// src/model/Prescription/prescription.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@ApiTags('prescriptions')
@Controller('api/prescriptions')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle prescription' })
  @ApiResponse({ status: 201, description: 'La prescription a été créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiBody({ type: CreatePrescriptionDto })
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les prescriptions' })
  @ApiResponse({ status: 200, description: 'Liste des prescriptions récupérée avec succès.' })
  findAll() {
    return this.prescriptionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une prescription par ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID de la prescription' })
  @ApiResponse({ status: 200, description: 'Prescription trouvée.' })
  @ApiResponse({ status: 404, description: 'Prescription non trouvée.' })
  findOne(@Param('id') id: string) {
    return this.prescriptionService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une prescription' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID de la prescription' })
  @ApiBody({ type: UpdatePrescriptionDto })
  @ApiResponse({ status: 200, description: 'Prescription mise à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Prescription non trouvée.' })
  update(@Param('id') id: string, @Body() updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionService.update(+id, updatePrescriptionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une prescription' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID de la prescription' })
  @ApiResponse({ status: 200, description: 'Prescription supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Prescription non trouvée.' })
  remove(@Param('id') id: string) {
    return this.prescriptionService.remove(+id);
  }
}