import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order-.dto';
import { OrderDetail } from './OrderDetail/order-detail.entity';
import { Cart } from '../Cart/cart.entity';
import { Product } from '../Product/product.entity';
import { Client } from '../Client/client.entity';
import { CartService } from '../Cart/cart.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly dataSource: DataSource,
    private readonly cartService: CartService
  ) {}

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderDetails', 'orderDetails.product']
    });

    if (!order) {
      throw new NotFoundException(`Commande ${id} non trouvée`);
    }

    return order;
  }

  async createOrderDetail(orderDetail: Partial<OrderDetail>): Promise<OrderDetail> {
    const product = await this.productRepository.findOne({
      where: { id_product: orderDetail.product?.id_product }
    });

    const newOrderDetail = this.orderDetailRepository.create({
      ...orderDetail,
      originalPrice: product.price,
      unitPrice: orderDetail.unitPrice
    });

    return this.orderDetailRepository.save(newOrderDetail);
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await this.getOrderById(id);

      Object.assign(order, {
        orderDate: updateOrderDto.orderDate || order.orderDate,
        id_statut: updateOrderDto.statusId || order.id_statut
      });

      if (updateOrderDto.orderLines?.length) {
        for (const detail of order.orderDetails) {
          const product = await this.productRepository.findOne({
            where: { id_product: detail.product.id_product }
          });
          if (product) {
            product.stock += detail.quantity;
            await queryRunner.manager.save(Product, product);
          }
        }

        await queryRunner.manager.delete(OrderDetail, { order: { id: id } });

        const newDetails = await Promise.all(
          updateOrderDto.orderLines.map(async (line) => {
            const product = await this.productRepository.findOne({
              where: { id_product: line.id_product }
            });

            if (!product) {
              throw new NotFoundException(`Produit ${line.id_product} non trouvé`);
            }

            if (product.stock < line.quantity) {
              throw new BadRequestException(
                `Stock insuffisant pour ${product.name}. Disponible: ${product.stock}`
              );
            }

            product.stock -= line.quantity;
            await queryRunner.manager.save(Product, product);

            return this.orderDetailRepository.create({
              order,
              product,
              quantity: line.quantity,
              unitPrice: line.unit_price,
              originalPrice: product.price
            });
          })
        );

        await queryRunner.manager.save(OrderDetail, newDetails);

        order.totalAmount = newDetails.reduce(
          (sum, detail) => sum + (detail.quantity * detail.unitPrice),
          0
        );
      }

      const updatedOrder = await queryRunner.manager.save(Order, order);
      await queryRunner.commitTransaction();
      return this.getOrderById(updatedOrder.id);

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteOrder(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await this.getOrderById(id);

      for (const detail of order.orderDetails) {
        const product = await this.productRepository.findOne({
          where: { id_product: detail.product.id_product }
        });
        if (product) {
          product.stock += detail.quantity;
          await queryRunner.manager.save(Product, product);
        }
      }

      await queryRunner.manager.delete(OrderDetail, { order: { id: id } });
      await queryRunner.manager.remove(Order, order);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAllByClient(clientId: number): Promise<Order[]> {
    try {
      console.log('Recherche des commandes pour le client:', clientId);
      
      const orders = await this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.orderDetails', 'orderDetails')
        .leftJoinAndSelect('orderDetails.product', 'product')
        .leftJoinAndSelect('order.status', 'status')
        .where('order.id_client = :clientId', { clientId })
        .orderBy('order.orderDate', 'DESC')
        .getMany();

      console.log('Commandes trouvées:', orders);
      console.log('Nombre de commandes trouvées:', orders.length);
      
      if (!orders.length) {
        console.log('Requête SQL générée:', 
          this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.orderDetails', 'orderDetails')
            .leftJoinAndSelect('orderDetails.product', 'product')
            .leftJoinAndSelect('order.status', 'status')
            .where('order.id_client = :clientId', { clientId })
            .orderBy('order.orderDate', 'DESC')
            .getSql()
        );
      }

      return orders;
    } catch (error) {
      console.error('Erreur lors de la recherche des commandes:', error);
      throw error;
    }
  }

  async validatePayment(orderId: number, clientId: number, paymentInfo: any): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await this.getOrderById(orderId);

      if (order.id_client !== clientId) {
        throw new BadRequestException('Cette commande ne vous appartient pas');
      }

      if (order.id_statut !== 1) {
        throw new BadRequestException('Cette commande ne peut pas être payée');
      }

      order.id_statut = 2;
      const updatedOrder = await queryRunner.manager.save(Order, order);

      await queryRunner.commitTransaction();
      return updatedOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async createOrderFromCart(clientId: number): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cartItems = await this.cartRepository.find({
        where: { clientId },
        relations: ['product', 'product.promotion']
      });

      if (!cartItems.length) {
        throw new BadRequestException('Le panier est vide');
      }

      const order = this.orderRepository.create({
        id_client: clientId,
        id_statut: 1,
        orderDate: new Date(),
        totalAmount: 0
      });

      const savedOrder = await queryRunner.manager.save(Order, order);

      const orderDetails = await Promise.all(
        cartItems.map(async (item) => {
          if (item.product.stock < item.quantity) {
            throw new BadRequestException(
              `Stock insuffisant pour ${item.product.name}. Disponible: ${item.product.stock}`
            );
          }

          const detail = this.orderDetailRepository.create({
            order: savedOrder,
            product: item.product,
            quantity: item.quantity,
            unitPrice: item.price,
            originalPrice: item.product.price
          });

          item.product.stock -= item.quantity;
          await queryRunner.manager.save(Product, item.product);

          return detail;
        })
      );

      await queryRunner.manager.save(OrderDetail, orderDetails);

      savedOrder.totalAmount = orderDetails.reduce(
        (sum, detail) => sum + (detail.quantity * detail.unitPrice),
        0
      );
      await queryRunner.manager.save(Order, savedOrder);

      await queryRunner.manager.delete(Cart, { clientId });

      await queryRunner.commitTransaction();

      return this.getOrderById(savedOrder.id);

    } catch (error) {
      this.logger.error(`Erreur lors de la création de la commande: ${error.message}`);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: [
        'orderDetails',
        'orderDetails.product',
        'status',
        'client'
      ],
      order: {
        orderDate: 'DESC'
      }
    });
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: [
        'client',
        'orderDetails',
        'orderDetails.product'
      ],
      order: {
        orderDate: 'DESC'
      }
    });
  }

  async updateOrderDetail(detailId: number, quantity: number): Promise<OrderDetail> {
    const detail = await this.orderDetailRepository.findOne({
      where: { id: detailId },
      relations: ['product']
    });

    if (!detail) {
      throw new NotFoundException('Détail de commande non trouvé');
    }

    if (quantity > detail.product.stock) {
      throw new BadRequestException('Stock insuffisant');
    }

    detail.quantity = quantity;
    return this.orderDetailRepository.save(detail);
  }

  async deleteOrderDetail(detailId: number): Promise<void> {
    const result = await this.orderDetailRepository.delete(detailId);
    if (result.affected === 0) {
      throw new NotFoundException('Détail de commande non trouvé');
    }
  }

  async getOrdersByClientId(clientId: number): Promise<any[]> {
    return this.orderRepository.query(
      'SELECT * FROM get_order_details_with_prices($1)',
      [clientId]
    );
  }

  async createOrder(orderData: any): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      this.logger.debug('Création de commande avec:', orderData);

      // 1. Vérifier le stock disponible
      for (const item of orderData.cartItems) {
        const product = await this.productRepository.findOne({
          where: { id_product: item.product.id_product }
        });

        if (!product) {
          throw new NotFoundException(`Produit ${item.product.id_product} non trouvé`);
        }

        if (product.stock < item.quantity) {
          throw new BadRequestException(
            `Stock insuffisant pour ${product.name}. Disponible: ${product.stock}`
          );
        }
      }

      // 2. Créer la commande
      const order = new Order();
      order.id_client = orderData.clientId;
      order.id_statut = orderData.id_statut;
      order.orderDate = new Date();
      order.totalAmount = orderData.totalAmount;

      const savedOrder = await queryRunner.manager.save(Order, order);

      // 3. Créer les détails de commande et mettre à jour le stock
      const orderDetails = [];
      for (const item of orderData.cartItems) {
        // Créer le détail
        const detail = new OrderDetail();
        detail.order = savedOrder;
        detail.product = { id_product: item.product.id_product } as Product;
        detail.quantity = item.quantity;
        detail.unitPrice = item.price;
        detail.originalPrice = item.product.price;
        orderDetails.push(detail);

        // Mettre à jour le stock
        await queryRunner.manager.createQueryBuilder()
          .update(Product)
          .set({
            stock: () => `stock - ${item.quantity}`
          })
          .where("id_product = :productId", { productId: item.product.id_product })
          .execute();

        this.logger.debug(`Stock mis à jour pour le produit ${item.product.id_product}, -${item.quantity} unités`);
      }

      await queryRunner.manager.save(OrderDetail, orderDetails);
      await queryRunner.commitTransaction();

      // 4. Récupérer la commande complète
      const completeOrder = await this.orderRepository.findOne({
        where: { id: savedOrder.id },
        relations: ['orderDetails', 'orderDetails.product', 'status']
      });

      this.logger.debug('Commande créée avec succès:', completeOrder);
      return completeOrder;

    } catch (error) {
      this.logger.error('Erreur lors de la création de la commande:', error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateOrderStatus(orderId: number, statusId: number): Promise<any> {
    if (!orderId || !statusId) {
      throw new BadRequestException('ID de commande et statusId sont requis');
    }

    // Vérifier que le statut est valide
    const validStatuses = [1, 2, 3, 4, 5, 6]; // Correspond aux statuts de l'enum
    if (!validStatuses.includes(statusId)) {
      throw new BadRequestException('Statut invalide');
    }

    const query = `
      UPDATE orders o
      SET id_statut = $2
      WHERE id_order = $1
      RETURNING id_order, id_statut, "orderDate", montant_total
    `;

    try {
      const result = await this.orderRepository.query(query, [orderId, statusId]);

      if (!result.length) {
        throw new NotFoundException(`Commande ${orderId} non trouvée`);
      }

      // Récupérer le libellé du statut pour le retour
      const statusLabels = {
        1: 'En attente',
        2: 'En cours de traitement',
        3: 'Expédié',
        4: 'Livré',
        5: 'Annulé',
        6: 'Payé'
      };

      return {
        ...result[0],
        statusLabel: statusLabels[statusId]
      };
    } catch (error) {
      this.logger.error(`Erreur lors de la mise à jour du statut: ${error.message}`);
      throw error;
    }
  }

  async getOrderTotal(order: Order): Promise<number> {
    if (!order.orderDetails) {
      order = await this.orderRepository.findOne({
        where: { id: order.id },
        relations: ['orderDetails']
      });
    }

    return order.orderDetails.reduce(
      (total, detail) => total + (detail.unitPrice * detail.quantity),
      0
    );
  }
}