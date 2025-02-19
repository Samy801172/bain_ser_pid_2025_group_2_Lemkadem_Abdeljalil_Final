// src/controllers/productPromotion.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductPromotionService } from './productPromotion.service';
import { CreateProductPromotionDto } from './dto/create-productPromotion.dto';
import { UpdateProductPromotionDto } from './dto/update-productPromotion.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

/**
 * Contrôleur gérant les promotions associées aux produits
 * Permet de gérer les relations entre les produits et leurs promotions
 */
@ApiTags('product-promotions')
@ApiBearerAuth('access-token')
@Controller('product-promotions')
export class ProductPromotionController {
  constructor(private readonly productPromotionService: ProductPromotionService) {}

  /**
   * Crée une nouvelle association produit-promotion
   * @param createProductPromotionDto - Données de création de l'association
   */
  @Post()
  create(@Body() createProductPromotionDto: CreateProductPromotionDto) {
    return this.productPromotionService.create(createProductPromotionDto);
  }

  /**
   * Récupère toutes les associations produit-promotion
   */
  @Get()
  findAll() {
    return this.productPromotionService.findAll();
  }

  /**
   * Récupère une association produit-promotion spécifique
   * @param id - Identifiant de l'association
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPromotionService.findOne(+id);
  }

  /**
   * Met à jour une association produit-promotion existante
   * @param id - Identifiant de l'association à modifier
   * @param updateProductPromotionDto - Nouvelles données de l'association
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductPromotionDto: UpdateProductPromotionDto) {
    return this.productPromotionService.update(+id, updateProductPromotionDto);
  }

  /**
   * Supprime une association produit-promotion
   * @param id - Identifiant de l'association à supprimer
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPromotionService.remove(+id);
  }
}
