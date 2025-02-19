// src/model/Payment/payment.service.ts
import { HttpException, HttpStatus, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Order } from '../Order/order.entity';
import { PaypalService } from 'model/Paypal/paypal.service';
import { OrderStatus } from 'model/OrderStatus/dto/order-status.enum';
import { OrderStatusEntity } from 'model/OrderStatus/orderStatus.entity';
import { DepositPaymentDto } from './dto/deposit-payment.dto';
import { ManufacturingStatus } from '../Manufacturing/enums/manufacturing-status.enum';
import { CreateDepositOrderDto } from './dto/create-deposit-order.dto';
import { ManufacturingCustomRequest } from '../Manufacturing/manufacturing-custom-request.entity';
import { Logger } from '@nestjs/common';
import { PaymentMethodEnum, PaymentStatusEnum } from './payment.enum';
import { OrderService } from '../Order/order.service';

/**
 * Interface pour la création d'un paiement
 */
interface PaymentCreationDto {
  amount: number;                    // Montant du paiement
  clientId: number;                  // ID du client
  manufacturingRequestId?: number;   // ID optionnel de la demande de fabrication
  orderId?: number;                  // ID optionnel de la commande
  paymentMethod: PaymentMethodEnum;  // Méthode de paiement
  paymentStatus: PaymentStatusEnum;  // Statut du paiement
  paypalOrderId: string;             // ID de la commande PayPal
}

/**
 * Service gérant les paiements de l'application
 */
@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderStatusEntity)
    private readonly orderStatusRepository: Repository<OrderStatusEntity>,
    private readonly paypalService: PaypalService,
    @InjectRepository(ManufacturingCustomRequest)
    private readonly manufacturingCustomRequestRepository: Repository<ManufacturingCustomRequest>,
    private readonly orderService: OrderService
  ) {}

  /**
   * Crée un nouvel ordre de paiement pour une commande
   * @param amount - Montant du paiement
   * @param orderId - ID de la commande
   * @returns Le paiement créé
   */
  async createOrder(amount: number, orderId: number): Promise<Payment> {
    try {
      // Vérifier que la commande et le client existent
      const order = await this.orderRepository.findOne({
        where: { id: orderId },
        relations: ['orderDetails', 'orderDetails.product', 'client', 'client.credential']
      });

      if (!order || !order.client || !order.client.credential) {
        throw new NotFoundException('Order, client or credentials not found');
      }

      // 2. Créer l'ordre PayPal
      const paypalOrder = await this.paypalService.createOrder(
        amount,
        orderId.toString()
      );

      // 3. Créer le paiement et le lier à la commande
      const payment = new Payment();
      payment.amount = amount;
      payment.paymentMethod = PaymentMethodEnum.PAYPAL;
      payment.paymentStatus = PaymentStatusEnum.PENDING;
      payment.order = order;
      payment.paypalOrderId = paypalOrder.id;

      // 4. Mettre à jour le statut de la commande
      order.id_statut = 1; // PENDING
      await this.orderRepository.save(order);

      // 5. Sauvegarder le paiement
      const savedPayment = await this.paymentRepository.save(payment);
      console.log('Paiement créé:', savedPayment);
      
      return savedPayment;
    } catch (error) {
      console.error('Erreur complète:', error);
      throw error;
    }
  }

  /**
   * Met à jour le statut d'un paiement PayPal
   * @param paypalOrderId - ID de la commande PayPal
   * @param status - Nouveau statut du paiement
   * @returns Le paiement mis à jour
   */
  async updatePaymentStatus(paypalOrderId: string, status: PaymentStatusEnum): Promise<Payment> {
    console.log('Mise à jour du statut du paiement:', { paypalOrderId, status });
    
    const payment = await this.findByPaypalOrderId(paypalOrderId);
    if (!payment) {
      console.error('Paiement non trouvé pour paypalOrderId:', paypalOrderId);
      throw new NotFoundException('Paiement non trouvé');
    }

    payment.paymentStatus = status;
    const savedPayment = await this.paymentRepository.save(payment);
    console.log('Paiement mis à jour:', savedPayment);
    
    return savedPayment;
  }

  /**
   * Récupère tous les paiements avec leurs commandes associées
   */
  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({
      relations: ['order']
    });
  }

  /**
   * Trouve un paiement par son ID
   * @param id - ID du paiement
   * @throws NotFoundException si le paiement n'est pas trouvé
   */
  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id: id },
      relations: ['order']
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  /**
   * Met à jour un paiement existant
   * @param id - ID du paiement à mettre à jour
   * @param updatePaymentDto - Données de mise à jour
   */
  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);

    if (updatePaymentDto.orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: updatePaymentDto.orderId }
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${updatePaymentDto.orderId} not found`);
      }

      payment.order = order;
    }

    // Mise à jour des autres propriétés
    Object.assign(payment, {
      paymentMethod: updatePaymentDto.paymentMethod ?? payment.paymentMethod,
      amount: updatePaymentDto.amount ?? payment.amount,
      paymentStatus: updatePaymentDto.paymentStatus ?? payment.paymentStatus
    });

    return this.paymentRepository.save(payment);
  }

  /**
   * Supprime un paiement
   * @param id - ID du paiement à supprimer
   */
  async remove(id: number): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentRepository.remove(payment);
  }

  /**
   * Capture un paiement PayPal et met à jour les statuts
   * @param orderId - ID de la commande PayPal
   */
  async capturePayment(orderId: string) {
    try {
      console.log('Début de capture du paiement pour orderId:', orderId);
      
      const payment = await this.findByPaypalOrderId(orderId);
      if (!payment) {
        throw new NotFoundException('Paiement non trouvé');
      }

      // Capturer le paiement PayPal
      await this.paypalService.capturePayment(orderId);

      // Mettre à jour le statut du paiement
      payment.paymentStatus = PaymentStatusEnum.COMPLETED;
      
      // Mettre à jour le statut de la commande
      if (payment.order) {
        // Changer le statut à PAID
        payment.order.id_statut = 2; // Assurez-vous que 2 correspond à PAID dans order_status
        await this.orderRepository.save(payment.order);
        
        // Log pour debug
        console.log('Commande mise à jour avec le statut PAID:', payment.order);
      }

      const savedPayment = await this.paymentRepository.save(payment);
      return savedPayment;
    } catch (error) {
      console.error('Erreur lors de la capture du paiement:', error);
      throw error;
    }
  }

  /**
   * Crée un paiement d'acompte pour une demande de fabrication
   * @param depositPaymentDto - Données de l'acompte
   */
  async createDepositPayment(depositPaymentDto: DepositPaymentDto): Promise<Payment> {
    const { manufacturingRequestId, amount, depositPercentage } = depositPaymentDto;
    
    const depositAmount = (amount * depositPercentage) / 100;

    const payment = new Payment();
    payment.amount = depositAmount;
    payment.currency = 'EUR';
    payment.paymentMethod = PaymentMethodEnum.PAYPAL;
    payment.paymentStatus = PaymentStatusEnum.PENDING;
    payment.isDeposit = true;
    payment.manufacturingRequestId = manufacturingRequestId;

    const paypalOrder = await this.paypalService.createOrder(
      depositAmount,
      manufacturingRequestId.toString()
    );

    payment.paypalOrderId = paypalOrder.id;
    
    return this.paymentRepository.save(payment);
  }

  /**
   * Confirme le paiement d'un acompte et met à jour les statuts
   * @param paypalOrderId - ID de la commande PayPal
   */
  async confirmDepositPayment(paypalOrderId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { paypalOrderId },
      relations: ['manufacturingRequest']
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // Capture le paiement PayPal
    await this.paypalService.capturePayment(paypalOrderId);

    // Met à jour le statut
    payment.paymentStatus = PaymentStatusEnum.COMPLETED;
    
    // Met à jour le statut de fabrication
    if (payment.manufacturingRequest) {
      payment.manufacturingRequest.status = ManufacturingStatus.EN_FABRICATION;
    }

    return this.paymentRepository.save(payment);
  }

  /**
   * Crée un ordre de paiement pour un acompte
   * @param data - Données de l'ordre d'acompte
   */
  async createDepositOrder(data: CreateDepositOrderDto) {
    const payment = new Payment();
    payment.amount = data.amount;
    payment.paymentMethod = PaymentMethodEnum.PAYPAL;
    payment.paymentStatus = PaymentStatusEnum.PENDING;
    payment.isDeposit = true;
    payment.manufacturingRequestId = data.manufacturingRequestId;

    return this.paymentRepository.save(payment);
  }

  /**
   * Crée un nouveau paiement
   * @param data - Données du paiement à créer
   */
  async createPayment(data: CreatePaymentDto): Promise<Payment> {
    const payment = new Payment();
    payment.amount = data.amount;
    payment.paymentMethod = data.paymentMethod;
    payment.paymentStatus = data.paymentStatus;
    payment.paypalOrderId = data.paypalOrderId;
    payment.isDeposit = data.isDeposit;
    payment.manufacturingRequestId = data.manufacturingRequestId;
    
    if (data.orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: data.orderId }
      });
      if (order) {
        payment.order = order;
      }
    }

    return this.paymentRepository.save(payment);
  }

  /**
   * Trouve un paiement par son ID de commande PayPal
   * @param paypalOrderId - ID de la commande PayPal
   */
  async findByPaypalOrderId(paypalOrderId: string): Promise<Payment> {
    return this.paymentRepository.findOne({
      where: { paypalOrderId }
    });
  }

  /**
   * Met à jour un paiement existant
   * @param paymentId - ID du paiement
   * @param data - Nouvelles données du paiement
   * @throws NotFoundException si le paiement ou la fabrication n'est pas trouvé
   */
  async updatePayment(paymentId: number, data: any): Promise<Payment> {
    try {
      const payment = await this.paymentRepository.findOne({
        where: { id: paymentId }
      });

      if (!payment) {
        throw new NotFoundException(`Payment ${paymentId} not found`);
      }

      // Vérifier si la fabrication existe avant de mettre à jour
      if (data.manufacturingRequestId) {
        const manufacturing = await this.manufacturingCustomRequestRepository.findOne({
          where: { id: data.manufacturingRequestId }
        });

        if (!manufacturing) {
          throw new NotFoundException(`Manufacturing request ${data.manufacturingRequestId} not found`);
        }
      }

      // Mise à jour du paiement
      Object.assign(payment, data);
      return await this.paymentRepository.save(payment);
    } catch (error) {
      this.logger.error('Error updating payment:', error);
      throw new InternalServerErrorException(
        `Error updating payment: ${error.message}`
      );
    }
  }

  /**
   * Capture un paiement PayPal et crée la commande associée
   * @param paypalOrderId - ID de la commande PayPal
   * @param clientId - ID du client
   * @param amount - Montant du paiement
   * @returns La commande et le paiement créés
   */
  async capturePaypalPayment(paypalOrderId: string, clientId: number, amount: number) {
    try {
      // Capturer le paiement PayPal
      await this.paypalService.capturePayment(paypalOrderId);

      // Création de la commande
      const order = await this.orderService.createOrder({
        clientId,
        cartItems: [],
        id_statut: 2,
        orderDate: new Date(),
        totalAmount: amount,
        paypalOrderId
      });

      // Créer le paiement associé
      const payment = await this.createPayment({
        amount,
        clientId,
        orderId: order.id,
        paymentMethod: PaymentMethodEnum.PAYPAL,
        paymentStatus: PaymentStatusEnum.COMPLETED,
        paypalOrderId,
        isDeposit: false,
        manufacturingRequestId: null
      });

      console.log('Commande créée:', order);
      console.log('Paiement créé:', payment);

      return { order, payment };
    } catch (error) {
      console.error('Erreur lors de la capture du paiement:', error);
      throw error;
    }
  }
}