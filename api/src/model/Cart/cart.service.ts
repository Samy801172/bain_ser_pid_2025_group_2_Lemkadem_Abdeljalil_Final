import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { Client } from '../Client/client.entity';
import { Product } from '../Product/product.entity';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name); // Logger pour suivre les événements

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>, // Repository pour gérer les entités Cart
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>, // Repository pour gérer les entités Product
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client> // Repository pour gérer les entités Client
  ) {}

  /**
   * Récupérer le panier d'un client
   * @param clientId - ID du client
   * @returns Liste des articles du panier
   */
  async getCartByClient(clientId: number): Promise<Cart[]> {
    this.logger.debug(`Getting cart for client ${clientId}`);

    // Récupère le panier avec les relations associées (produits et promotions)
    const cart = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.product', 'product')
      .leftJoinAndSelect('product.promotion', 'promotion')
      .where('cart.clientId = :clientId', { clientId })
      .orderBy('cart.created_at', 'DESC')
      .getMany();

    // Applique les promotions si elles sont actives
    const cartWithPromotions = cart.map(item => {
      const hasPromotion = item.product.promotion &&
        this.isPromotionActive(item.product.promotion);

      if (hasPromotion) {
        item.appliedPromotionId = item.product.promotion.id_promotion;
      }

      return item;
    });

    this.logger.debug(`Cart items found: ${JSON.stringify(cartWithPromotions)}`);
    return cartWithPromotions;
  }

  /**
   * Ajouter un produit au panier
   * @param clientId - ID du client
   * @param dto - Détails du produit à ajouter (DTO)
   * @returns L'article ajouté au panier
   */
  async addToCart(clientId: number, dto: CreateCartDto): Promise<Cart> {
    try {
      if (!clientId) {
        throw new BadRequestException('ClientId est requis');
      }

      const product = await this.productRepository.findOne({
        where: { id_product: dto.productId },
        relations: ['promotion']
      });

      if (!product) {
        throw new NotFoundException('Produit non trouvé');
      }

      // Calculer le prix avec la promotion si elle existe
      const price = product.promotion 
        ? product.price * (1 - product.promotion.discountPercentage / 100)
        : product.price;

      // Créer le panier avec les bonnes relations
      const cart = this.cartRepository.create({
        client: { clientId }, // Utiliser la relation client
        product: { id_product: dto.productId }, // Utiliser la relation product
        quantity: dto.quantity,
        price: price,
        appliedPromotionId: product.promotion?.id_promotion
      });

      return await this.cartRepository.save(cart);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Mettre à jour la quantité d'un article
   * @param cartItemId - ID de l'article du panier
   * @param quantity - Nouvelle quantité
   * @returns L'article mis à jour
   */
  async updateQuantity(cartItemId: number, quantity: number): Promise<Cart> {
    // Vérifie si l'article existe
    const cartItem = await this.cartRepository.findOne({
      where: { id: cartItemId },
      relations: ['product']
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    // Vérifie la validité de la quantité
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    if (quantity > cartItem.product.stock) {
      throw new BadRequestException('Requested quantity exceeds available stock');
    }

    cartItem.quantity = quantity;
    return this.cartRepository.save(cartItem); // Sauvegarde l'article mis à jour
  }

  /**
   * Supprimer un article du panier
   * @param cartItemId - ID de l'article à supprimer
   */
  async removeFromCart(cartItemId: number): Promise<void> {
    const result = await this.cartRepository.delete(cartItemId);
    if (result.affected === 0) {
      throw new NotFoundException('Cart item not found');
    }
  }

  /**
   * Vider le panier d'un client
   * @param clientId - ID du client
   */
  async clearCart(clientId: number): Promise<void> {
    const client = await this.clientRepository.findOne({
      where: { clientId }
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    await this.cartRepository.delete({ clientId }); // Supprime tous les articles du panier
  }

  /**
   * Vérifie si une promotion est active
   * @param promotion - Détails de la promotion
   * @returns True si la promotion est active, sinon False
   */
  private isPromotionActive(promotion: any): boolean {
    if (!promotion) return false;
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    return now >= startDate && now <= endDate;
  }

  async getCartItems(clientId: number) {
    return this.cartRepository.find({
      where: { clientId },
      relations: ['product']
    });
  }
}
