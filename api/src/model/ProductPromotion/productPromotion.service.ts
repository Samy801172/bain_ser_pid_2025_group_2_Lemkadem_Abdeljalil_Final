// src/services/productPromotion.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductPromotion } from './productPromotion.entity';


import { CreateProductPromotionDto } from './dto/create-productPromotion.dto';
import { UpdateProductPromotionDto } from './dto/update-productPromotion.dto';
import { Product } from 'model/Product/product.entity';
import { Promotion } from 'model/Promotion/promotion.entity';

/**
 * Service de gestion des promotions produits
 * Gère l'application des promotions aux produits
 */
@Injectable()
export class ProductPromotionService {
  constructor(
    @InjectRepository(ProductPromotion)
    private readonly productPromotionRepository: Repository<ProductPromotion>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
  ) {}

  /**
   * Crée une nouvelle association produit-promotion
   * @param createProductPromotionDto - DTO contenant les IDs produit et promotion
   * @returns L'association créée
   */
  async create(createProductPromotionDto: CreateProductPromotionDto): Promise<ProductPromotion> {
    const product = await this.productRepository.findOne({ where: { id_product: createProductPromotionDto.productId } });
    const promotion = await this.promotionRepository.findOne({ where: { id_promotion: createProductPromotionDto.promotionId } });

    if (!product || !promotion) {
      throw new NotFoundException('Product or Promotion not found');
    }

    const productPromotion = this.productPromotionRepository.create({
      product,
      promotion,
    });

    return this.productPromotionRepository.save(productPromotion);
  }

  async findAll(): Promise<ProductPromotion[]> {
    return this.productPromotionRepository.find({ relations: ['product', 'promotion'] });
  }

  async findOne(id: number): Promise<ProductPromotion> {
    const productPromotion = await this.productPromotionRepository.findOne({
      where: { id_product_promotion: id },
      relations: ['product', 'promotion'],
    });
    if (!productPromotion) {
      throw new NotFoundException(`ProductPromotion with ID ${id} not found`);
    }
    return productPromotion;
  }

  async update(id: number, updateProductPromotionDto: UpdateProductPromotionDto): Promise<ProductPromotion> {
    const productPromotion = await this.findOne(id);

    if (updateProductPromotionDto.productId) {
      const product = await this.productRepository.findOne({ where: { id_product: updateProductPromotionDto.productId } });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      productPromotion.product = product;
    }

    if (updateProductPromotionDto.promotionId) {
      const promotion = await this.promotionRepository.findOne({ where: { id_promotion: updateProductPromotionDto.promotionId } });
      if (!promotion) {
        throw new NotFoundException('Promotion not found');
      }
      productPromotion.promotion = promotion;
    }

    return this.productPromotionRepository.save(productPromotion);
  }

  async remove(id: number): Promise<void> {
    const productPromotion = await this.findOne(id);
    await this.productPromotionRepository.remove(productPromotion);
  }
}
