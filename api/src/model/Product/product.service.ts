// src/model/Product/product.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Type } from '../Type/type.entity';
import { Promotion } from '../Promotion/promotion.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>
  ) {}

  // Créer un nouveau produit
  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Vérifier si le type existe
    const type = await this.typeRepository.findOne({
      where: { id_type: createProductDto.typeId }
    });

    if (!type) {
      throw new NotFoundException('Type not found');
    }

    // Créer et sauvegarder le produit
    const product = this.productRepository.create({
      ...createProductDto,
      type
    });
    return this.productRepository.save(product);
  }

  // Récupérer tous les produits avec leurs relations
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['type', 'promotion']
    });
  }

  // Récupérer un produit par son ID
  async findOne(id: number) {
    if (!id || isNaN(id)) {
      throw new BadRequestException('ID produit invalide');
    }

    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productPromotions', 'productPromotions')
      .leftJoinAndSelect('productPromotions.promotion', 'promotion')
      .where('product.id_product = :id', { id })
      .getOne();

    if (!product) {
      throw new NotFoundException(`Produit #${id} non trouvé`);
    }

    return product;
  }

  // Mettre à jour un produit
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    // Vérifier si le produit existe
    const product = await this.findOne(id);

    // Si un nouveau type est spécifié, le vérifier
    if (updateProductDto.typeId) {
      const type = await this.typeRepository.findOne({
        where: { id_type: updateProductDto.typeId }
      });
      if (!type) {
        throw new NotFoundException('Type not found');
      }
      product.type = type;
    }

    // Mettre à jour et sauvegarder
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  // Supprimer un produit
  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  // Appliquer une promotion à un produit
  async applyPromotion(productId: number, promotionId: number): Promise<Product> {
    // Vérifier si le produit existe
    const product = await this.findOne(productId);

    // Vérifier si la promotion existe
    const promotion = await this.promotionRepository.findOne({
      where: { id_promotion: promotionId }
    });

    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${promotionId} not found`);
    }

    // Appliquer la promotion et sauvegarder
    product.promotion = promotion;
    return this.productRepository.save(product);
  }
}