// src/model/Payment/payment.controller.ts
import { Controller, Post, Put, Body, Param, HttpException, HttpStatus, BadRequestException, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { PaypalService } from '../Paypal/paypal.service';
import { OrderService } from '../Order/order.service';
import { JwtGuard } from '../../feature/security/guard/jwt.guard';

import { PaymentStatusEnum, PaymentMethodEnum } from './payment.enum';
import { PaypalOrderDto } from 'model/Paypal/dto/paypalOrder.dto';
import { DepositPaymentDto } from './dto/deposit-payment.dto';
import { OrderStatus } from '../OrderStatus/enums/order-status.enum';
import { ManufacturingService } from '../Manufacturing/manufacturing.service';
import { ManufacturingStatus } from '../Manufacturing/enums/manufacturing-status.enum';
import { CartService } from '../Cart/cart.service';
import { CreatePaymentDto } from './dto/create-payment.dto';


@ApiTags('payments')
@Controller('payments')
@UseGuards(JwtGuard)
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly paypalService: PaypalService,
    private readonly orderService: OrderService,
    private readonly manufacturingService: ManufacturingService,
    private readonly cartService: CartService
  ) {}

  @Post('paypal/create')
  @ApiOperation({ summary: 'Créer un ordre PayPal' })
  async createPaypalOrder(@Body() body: {
    amount: number;
    clientId: number;
    isDeposit: boolean;
    manufacturingId?: number;
    currency: string;
    paymentMethod: string;
    prescriptionFile?: string;
  }) {
    try {
      console.log('Création ordre PayPal - Données reçues:', body);

      // Vérifier si c'est un acompte
      if (body.isDeposit && !body.manufacturingId) {
        throw new BadRequestException('manufacturingId requis pour un acompte');
      }

      // Générer la référence
      const referenceId = body.isDeposit 
        ? `MFG_${body.manufacturingId}_${Date.now()}`
        : `CART_${body.clientId}_${Date.now()}`;

      // Créer l'ordre PayPal
      const paypalOrder = await this.paypalService.createOrder(
        body.amount,
        referenceId
      );

      console.log('Ordre PayPal créé:', paypalOrder);

      // Créer l'enregistrement de paiement
      const paymentData: CreatePaymentDto = {
        amount: body.amount,
        clientId: body.clientId,
        manufacturingRequestId: body.manufacturingId,
        paymentMethod: PaymentMethodEnum.PAYPAL,
        paymentStatus: PaymentStatusEnum.PENDING,
        paypalOrderId: paypalOrder.id,
        isDeposit: body.isDeposit || false,
        orderId: null,
        prescriptionFile: body.prescriptionFile
      };

      const payment = await this.paymentService.createPayment(paymentData);
      console.log('Paiement créé:', payment);

      return {
        paypalOrderId: paypalOrder.id,
        orderId: referenceId,
        status: 'success'
      };

    } catch (error) {
      console.error('Erreur création commande PayPal:', error);
      throw new HttpException(
        error.message || 'Erreur lors de la création de la commande PayPal',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('paypal/capture/:paypalOrderId')
  @ApiOperation({ summary: 'Capturer un paiement PayPal' })
  async capturePaypalOrder(
    @Param('paypalOrderId') paypalOrderId: string,
    @Body() body: { 
      clientId: number;
      manufacturingId?: number;
      status: string;
      isManufacturing: boolean;
      type?: string;
      description?: string;
      instructions?: string;
      prescriptionFile?: string;
    }
  ) {
    try {
      console.log('Capture PayPal - Données reçues:', { paypalOrderId, ...body });

      const captureResult = await this.paypalService.captureOrder(paypalOrderId);

      if (body.isManufacturing) {
        console.log('Traitement d\'un paiement de fabrication');
        
        // Créer la fabrication
        const manufacturingData = {
          clientId: body.clientId,
          type: body.type || 'capsules',
          description: body.description || '',
          status: ManufacturingStatus.ACOMPTE_PAYE,
          estimatedPrice: 15.00,
          instructions: body.instructions || '',
          prescriptionPath: body.prescriptionFile,
          prescriptionFile: body.prescriptionFile,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        console.log('Création de la fabrication avec:', manufacturingData);
        const newManufacturing = await this.manufacturingService.create(manufacturingData);
        console.log('Nouvelle fabrication créée:', newManufacturing);

        // Créer le paiement associé avec clientId
        const paymentData = {
          clientId: body.clientId,
          amount: 15.00,
          currency: 'EUR',
          paymentMethod: PaymentMethodEnum.PAYPAL,
          paymentStatus: PaymentStatusEnum.COMPLETED,
          paypalOrderId: paypalOrderId,
          isDeposit: true,
          manufacturingRequestId: newManufacturing.id
        };

        const payment = await this.paymentService.createPayment(paymentData);
        console.log('Paiement créé:', payment);

        return {
          success: true,
          payment: captureResult,
          manufacturingId: newManufacturing.id,
          status: 'success'
        };
      } else {
        // Pour une commande normale
        const cartItems = await this.cartService.getCartItems(body.clientId);
        
        if (!cartItems.length) {
          throw new BadRequestException('Panier vide');
        }

        const totalAmount = cartItems.reduce((sum, item) => 
          sum + (Number(item.price) * item.quantity), 0
        );

        // Adapter la structure pour correspondre à ce qu'attend createOrder
        const orderData = {
          clientId: body.clientId,
          id_statut: 2, // PAID
          totalAmount: totalAmount,
          cartItems: cartItems.map(item => ({
            product: {
              id_product: item.product.id_product,
              price: item.price
            },
            quantity: item.quantity,
            price: item.price
          }))
        };

        console.log('Création de commande avec:', orderData);
        const order = await this.orderService.createOrder(orderData);
        console.log('Commande créée:', order);

        // Vider le panier
        await this.cartService.clearCart(body.clientId);

        return {
          success: true,
          payment: captureResult,
          order
        };
      }
    } catch (error) {
      console.error('Erreur capture PayPal:', error);
      throw new HttpException(
        error.message || 'Erreur lors de la capture PayPal',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('process-deposit')
  @ApiOperation({ summary: 'Traiter un paiement d\'acompte' })
  async processDeposit(@Body() body: {
    amount: number;
    manufacturingRequestId: number;
    paymentMethod: string;
    clientId: number;
  }) {
    try {
      return await this.paymentService.createDepositPayment({
        manufacturingRequestId: body.manufacturingRequestId,
        amount: body.amount,
        depositPercentage: 30,
        currency: 'EUR',
        clientId: body.clientId
      });
    } catch (error) {
      throw new HttpException(
        'Erreur lors du traitement de l\'acompte',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Put('paypal/status/:orderId')
  @ApiOperation({ summary: 'Mettre à jour le statut d\'un paiement' })
  async updatePaymentStatus(
    @Param('orderId') orderId: string,
    @Body('status') status: PaymentStatusEnum
  ) {
    try {
      return await this.paymentService.updatePaymentStatus(orderId, status);
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la mise à jour du statut',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('deposit')
  async createDepositPayment(@Body() depositPaymentDto: DepositPaymentDto) {
    return this.paymentService.createDepositPayment(depositPaymentDto);
  }

  @Post('deposit/confirm/:orderId')
  async confirmDepositPayment(@Param('orderId') paypalOrderId: string) {
    return this.paymentService.confirmDepositPayment(paypalOrderId);
  }
}