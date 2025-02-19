// src/model/Product/product.controller.ts
import { Controller, Post, Body, Get, Put, Delete, Param, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Créer un nouveau produit
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // Récupérer tous les produits
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  // Récupérer un produit par son ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  // Mettre à jour un produit
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(Number(id), updateProductDto);
  }

  // Supprimer un produit
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(Number(id));
  }

  // Appliquer une promotion à un produit
  @Post(':id/apply-promotion')
  async applyPromotion(
    @Param('id') id: string,
    @Body() data: { promotionId: number }
  ) {
    return this.productService.applyPromotion(Number(id), data.promotionId);
  }
}