import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  BadRequestException,
  HttpStatus,
  Logger,
  Request,
  ForbiddenException,
  Req
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@common/decorators';
import { Order } from './order.entity';
import { JwtAuthGuard } from '@feature/security/guard/jwt-auth.guard';
import { UpdateOrderDto } from './dto/update-order-.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtGuard } from '@feature/security/guard/jwt.guard';

@ApiTags('orders') // Tag pour la documentation Swagger
@ApiBearerAuth('access-token') // Indique que ces routes nécessitent un token d'authentification
@Controller('orders') // Définir le préfixe de route pour ce contrôleur
@UseGuards(JwtAuthGuard) // Appliquer le garde JWT à toutes les routes de ce contrôleur
export class OrderController {

  private readonly logger = new Logger(OrderController.name);

  constructor(private readonly orderService: OrderService) {}

  // Récupérer toutes les commandes (Admin uniquement)
  @Get('admin/all')
  @ApiOperation({ summary: "Récupérer toutes les commandes (Admin uniquement)" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Liste des commandes récupérée avec succès', type: [Order] })
  async findAllOrders(@User('isAdmin') isAdmin: boolean) {
    this.logger.debug('Tentative de récupération de toutes les commandes');

    if (!isAdmin) {
      this.logger.warn('Tentative d\'accès non autorisé à la liste des commandes');
      throw new BadRequestException('Accès réservé aux administrateurs');
    }

    try {
      const orders = await this.orderService.findAllOrders();
      this.logger.debug(`${orders.length} commandes récupérées`);
      return orders;
    } catch (error) {
      this.logger.error('Erreur lors de la récupération des commandes:', error);
      throw error;
    }
  }

  // Créer une nouvelle commande
  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: "Créer une nouvelle commande" })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  // Récupérer une commande spécifique par son ID
  @Get(':id')
  @ApiOperation({ summary: "Récupérer une commande par son ID" })
  async findOne(
    @User('clientId') clientId: number,
    @User('isAdmin') isAdmin: boolean,
    @Param('id') id: string
  ) {
    const order = await this.orderService.getOrderById(+id);

    if (!isAdmin && order.id_client !== clientId) {
      throw new BadRequestException('Vous ne pouvez accéder qu\'à vos propres commandes');
    }

    return order;
  }

  // Récupérer toutes les commandes d'un client
  @Get('client/:clientId')
  @ApiOperation({ summary: "Récupérer toutes les commandes d'un client" })
  async findAllByClient(
    @Param('clientId') clientId: string,
    @User('clientId') userClientId: number,
    @User('isAdmin') isAdmin: boolean
  ) {
    // Vérification des droits d'accès
    if (!isAdmin && +clientId !== userClientId) {
      throw new BadRequestException('Vous ne pouvez accéder qu\'à vos propres commandes');
    }

    try {
      console.log('Recherche des commandes pour le client:', clientId);
      const orders = await this.orderService.findAllByClient(+clientId);
      console.log('Nombre de commandes trouvées:', orders.length);
      return orders;
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
      throw error;
    }
  }

  // Mettre à jour une commande
  @Put(':id')
  @ApiOperation({ summary: "Mettre à jour une commande" })
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
    @Req() req: any
  ): Promise<Order> {
    const order = await this.orderService.getOrderById(id);
    const { isAdmin, clientId } = req.user;

    if (!isAdmin && order.id_client !== clientId) {
      throw new ForbiddenException('Vous ne pouvez pas modifier cette commande');
    }

    return this.orderService.updateOrder(id, updateOrderDto);
  }

  // Supprimer une commande (admin uniquement)
  @Delete(':id')
  @ApiOperation({ summary: "Supprimer une commande" })
  async remove(@Param('id') id: number, @Req() req: any): Promise<void> {
    const order = await this.orderService.getOrderById(id);
    const { isAdmin, clientId } = req.user;

    if (!isAdmin && order.id_client !== clientId) {
      throw new ForbiddenException('Vous ne pouvez pas supprimer cette commande');
    }

    return this.orderService.deleteOrder(id);
  }

  // Mettre à jour le statut d'une commande
  @Put(':id/status')
  @ApiOperation({ summary: 'Mettre à jour le statut d\'une commande' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateData: { statusId: number }
  ) {
    try {
      const orderId = parseInt(id, 10);
      if (isNaN(orderId)) {
        throw new BadRequestException('ID de commande invalide');
      }

      if (!updateData?.statusId || typeof updateData.statusId !== 'number') {
        throw new BadRequestException('statusId doit être un nombre valide');
      }

      this.logger.debug(`Mise à jour du statut - orderId: ${orderId}, statusId: ${updateData.statusId}`);

      const result = await this.orderService.updateOrderStatus(orderId, updateData.statusId);

      return {
        success: true,
        message: `Statut de la commande ${orderId} mis à jour en "${result.statusLabel}"`,
        order: result
      };
    } catch (error) {
      this.logger.error(`Erreur lors de la mise à jour du statut de la commande ${id}:`, error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'Erreur lors de la mise à jour du statut');
    }
  }

  // Valider le paiement d'une commande
  @Post(':id/payment')
  @ApiOperation({ summary: "Valider le paiement d'une commande" })
  async validatePayment(
    @User('clientId') clientId: number,
    @Param('id') orderId: string,
    @Body() paymentInfo: { paymentMethod: string }
  ) {
    return this.orderService.validatePayment(+orderId, clientId, paymentInfo);
  }

  // Supprimer un détail de commande (admin uniquement)
  @Delete('details/:detailId')
  @ApiOperation({ summary: "Supprimer un détail de commande" })
  async deleteOrderDetail(
    @User('isAdmin') isAdmin: boolean,
    @Param('detailId') detailId: string
  ) {
    if (!isAdmin) {
      throw new BadRequestException('Seul un administrateur peut supprimer un détail de commande');
    }
    return this.orderService.deleteOrderDetail(+detailId);
  }

  // Mettre à jour un détail de commande (admin uniquement)
  @Put('details/:detailId')
  @ApiOperation({ summary: "Mettre à jour un détail de commande" })
  async updateOrderDetail(
    @User('isAdmin') isAdmin: boolean,
    @Param('detailId') detailId: string,
    @Body() updateData: { quantity: number }
  ) {
    if (!isAdmin) {
      throw new BadRequestException('Seul un administrateur peut modifier un détail de commande');
    }
    return this.orderService.updateOrderDetail(+detailId, updateData.quantity);
  }
}
