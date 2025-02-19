// src/model/Promotion/promotion.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { Promotion } from './promotion.entity';

/**
 * Contrôleur gérant les promotions
 * Permet de créer, lire, modifier et supprimer des promotions
 */
@ApiTags('promotions')
@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  /**
   * Crée une nouvelle promotion
   * @param createPromotionDto - Données de la promotion à créer
   * @returns La promotion créée
   */
  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle promotion' })
  @ApiResponse({ status: 201, description: 'La promotion a été créée avec succès.' })
  async createPromotion(@Body() createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    try {
      return await this.promotionService.createPromotion(createPromotionDto);
    } catch (error) {
      console.error('Erreur création promotion:', error);
      throw error;
    }
  }

  /**
   * Récupère toutes les promotions
   * @returns Liste de toutes les promotions
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les promotions' })
  findAll() {
    return this.promotionService.findAll();
  }

  /**
   * Récupère les promotions actuellement actives
   * @returns Liste des promotions actives
   */
  @Get('active')
  @ApiOperation({ summary: 'Récupérer les promotions actives' })
  async getActivePromotions(): Promise<Promotion[]> {
    console.log('Requête reçue pour les promotions actives');
    const promotions = await this.promotionService.getActivePromotions();
    console.log('Promotions actives trouvées:', promotions);
    return promotions;
  }

  /**
   * Récupère une promotion spécifique par son ID
   * @param id - Identifiant de la promotion
   * @returns La promotion demandée
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une promotion par son ID' })
  findOne(@Param('id') id: string) {
    return this.promotionService.findOne(+id);
  }

  /**
   * Met à jour une promotion existante
   * @param id - Identifiant de la promotion à modifier
   * @param updatePromotionDto - Nouvelles données de la promotion
   * @returns La promotion mise à jour
   */
  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une promotion' })
  update(@Param('id') id: string, @Body() updatePromotionDto: CreatePromotionDto) {
    return this.promotionService.update(+id, updatePromotionDto);
  }

  /**
   * Supprime une promotion
   * @param id - Identifiant de la promotion à supprimer
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une promotion' })
  remove(@Param('id') id: string) {
    return this.promotionService.remove(+id);
  }
}