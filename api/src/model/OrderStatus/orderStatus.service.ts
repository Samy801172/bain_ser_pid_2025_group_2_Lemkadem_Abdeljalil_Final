import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatusEntity } from './orderStatus.entity';
import { CreateOrderStatusDto } from './dto/create-orderStatus.dto';
import { UpdateOrderStatusDto } from './dto/update-orderStatus.dto';

/**
 * Service de gestion des statuts de commande
 * Gère la logique métier liée aux statuts des commandes
 */
@Injectable()
export class OrderStatusService {
  constructor(
    @InjectRepository(OrderStatusEntity)
    private readonly orderStatusRepository: Repository<OrderStatusEntity>
  ) {}

  /**
   * Crée un nouveau statut de commande
   * @param createOrderStatusDto - DTO contenant les données du statut
   * @returns Le statut créé
   */
  async create(createOrderStatusDto: CreateOrderStatusDto): Promise<OrderStatusEntity> {
    // Créer une nouvelle instance de statut avec les données fournies
    const orderStatus = this.orderStatusRepository.create(createOrderStatusDto);
    // Sauvegarder le statut dans la base de données
    return this.orderStatusRepository.save(orderStatus);
  }

  /**
   * Récupère tous les statuts avec leurs commandes associées
   * @returns Une liste de tous les statuts de commande
   */
  async findAll(): Promise<OrderStatusEntity[]> {
    // Récupérer tous les statuts avec leurs relations (commandes associées)
    return this.orderStatusRepository.find({ relations: ['orders'] });
  }

  /**
   * Récupère un statut spécifique par son ID
   * @param id - L'ID du statut à récupérer
   * @returns Le statut trouvé
   * @throws NotFoundException si le statut n'est pas trouvé
   */
  async findOne(id: number): Promise<OrderStatusEntity> {
    const status = await this.orderStatusRepository.findOne({
      where: { id }
    });

    if (!status) {
      throw new NotFoundException(`Status ${id} not found`);
    }

    return status;
  }

  /**
   * Met à jour un statut de commande existant
   * @param id - L'ID du statut à mettre à jour
   * @param updateOrderStatusDto - DTO contenant les nouvelles données du statut
   * @returns Le statut mis à jour
   * @throws NotFoundException si le statut n'est pas trouvé
   */
  async update(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<OrderStatusEntity> {
    // Récupérer le statut existant
    const orderStatus = await this.findOne(id);
    if (!orderStatus) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }

    // Mettre à jour les propriétés du statut avec les nouvelles données
    const updated = Object.assign(orderStatus, updateOrderStatusDto);
    // Sauvegarder les modifications dans la base de données
    return this.orderStatusRepository.save(updated);
  }

  /**
   * Supprime un statut de commande
   * @param id - L'ID du statut à supprimer
   * @returns void
   * @throws NotFoundException si le statut n'est pas trouvé
   */
  async remove(id: number): Promise<void> {
    // Récupérer le statut existant
    const orderStatus = await this.findOne(id);
    // Supprimer le statut de la base de données
    await this.orderStatusRepository.remove(orderStatus);
  }
}
