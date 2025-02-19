// src/model/OrderStatus/orderStatus.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrderStatusService } from './orderStatus.service';
import { CreateOrderStatusDto } from './dto/create-orderStatus.dto';
import { UpdateOrderStatusDto } from './dto/update-orderStatus.dto';
import { ApiTags } from '@nestjs/swagger';

/**
 * Contrôleur pour la gestion des statuts de commande
 * Fournit les endpoints CRUD pour les statuts
 */
@ApiTags('order-status')
@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  /**
   * Crée un nouveau statut de commande
   * @param createOrderStatusDto - DTO contenant les données du statut
   */
  @Post()
  create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    return this.orderStatusService.create(createOrderStatusDto);
  }

  /**
   * Récupère tous les statuts de commande
   */
  @Get()
  findAll() {
    return this.orderStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderStatusService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    return this.orderStatusService.update(+id, updateOrderStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderStatusService.remove(+id);
  }
}
