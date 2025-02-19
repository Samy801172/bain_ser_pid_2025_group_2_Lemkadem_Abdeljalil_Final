// src/model/Cart/cart.controller.ts
import { Controller, Post, Body, UseGuards, Req, Get, Put, Delete, Param, Logger, BadRequestException } from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { JwtGuard } from '@feature/security';
import { User } from '@common/config';
import { ClientService } from '../Client/client.service';

/**
 * Contrôleur de gestion du panier
 * Gère les opérations CRUD sur le panier d'un client
 */
@Controller('cart')
export class CartController {
  private readonly logger = new Logger(CartController.name);

  constructor(
    private readonly cartService: CartService,
    private readonly clientService: ClientService
  ) {}

  private async getClientId(user: any): Promise<number> {
    // Pour les clients classiques
    if (user.clientId) {
      return user.clientId;
    }

    // Pour les clients Gmail
    if (user.credentialId) {
      const client = await this.clientService.findByCredentialId(user.credentialId);
      if (client) {
        return client.clientId;
      }
    }

    throw new BadRequestException('ClientId non trouvé');
  }

  /**
   * Ajoute un produit au panier
   * @param request - Requête contenant les informations du client
   * @param createCartDto - DTO contenant les informations du produit à ajouter
   * @throws Error si l'ajout échoue
   */
  @Post()
  @UseGuards(JwtGuard)
  async addToCart(@Body() dto: CreateCartDto, @User() user: any) {
    try {
      this.logger.debug('Adding to cart - User:', user);
      this.logger.debug('CreateCartDto:', dto);

      // Utiliser le clientId du DTO ou du localStorage
      const clientId = dto.clientId || parseInt(localStorage.getItem('clientId'), 10);

      if (!clientId) {
        throw new BadRequestException('ClientId est requis');
      }

      return await this.cartService.addToCart(clientId, dto);
    } catch (error) {
      this.logger.error('Error adding to cart:', error.message);
      throw error;
    }
  }

  // Récupérer le panier
  @Get()
  @UseGuards(JwtGuard)
  async getCart(@User() user: any) {
    try {
      const clientId = await this.getClientId(user);
      const cart = await this.cartService.getCartByClient(clientId);
      this.logger.debug(`Cart items found: ${cart.length}`);
      return cart;
    } catch (error) {
      this.logger.error(`Error getting cart: ${error.message}`);
      throw error;
    }
  }

  // Mettre à jour la quantité
  @Put(':id/quantity')
  @UseGuards(JwtGuard)
  async updateQuantity(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto
  ) {
    return this.cartService.updateQuantity(
      parseInt(id, 10),
      updateCartDto.quantity
    );
  }

  // Supprimer du panier
  @Delete(':id')
  @UseGuards(JwtGuard)
  async removeFromCart(@Param('id') id: number) {
    return this.cartService.removeFromCart(id);
  }

  // Vider le panier
  @Delete('clear/:clientId')
  async clearCart(@Param('clientId') clientId: number) {
    return this.cartService.clearCart(clientId);
  }
}