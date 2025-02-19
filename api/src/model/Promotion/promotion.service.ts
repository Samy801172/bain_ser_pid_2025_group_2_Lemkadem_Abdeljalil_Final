// src/model/Promotion/promotion.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Promotion } from './promotion.entity';
import { CreatePromotionDto } from './dto/create-promotion.dto';

// Le service PromotionService est marqué comme injectable grâce au décorateur @Injectable,
// ce qui permet à NestJS de l'injecter dans d'autres parties de l'application.
@Injectable()
export class PromotionService {
  // Injection du repository de l'entité Promotion pour accéder aux opérations TypeORM.
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>
  ) {}

  // Méthode pour créer une nouvelle promotion.
  // Elle reçoit un DTO, instancie une entité, puis la sauvegarde dans la base de données.
  async create(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const promotion = this.promotionRepository.create(createPromotionDto);
    return await this.promotionRepository.save(promotion);
  }

  // Méthode pour récupérer toutes les promotions.
  // Elle retourne simplement toutes les promotions disponibles.
  async findAll(): Promise<Promotion[]> {
    return await this.promotionRepository.find();
  }

  // Méthode pour trouver une promotion par son ID.
  // Elle lève une exception NotFoundException si aucune promotion n'est trouvée.
  async findOne(id: number): Promise<Promotion> {
    const promotion = await this.promotionRepository.findOne({
      where: { id_promotion: id } // Utilisation de l'attribut 'id_promotion' comme clé primaire.
    });

    // Gestion des cas où l'ID fourni ne correspond à aucune promotion.
    if (!promotion) {
      throw new NotFoundException(`Promotion #${id} non trouvée`);
    }

    return promotion;
  }

  // Méthode pour mettre à jour une promotion existante.
  // Elle utilise l'ID pour localiser la promotion et applique les nouvelles valeurs avant de sauvegarder.
  async update(id: number, updatePromotionDto: CreatePromotionDto): Promise<Promotion> {
    const promotion = await this.findOne(id);

    // Mise à jour des propriétés de l'entité promotion avec les nouvelles valeurs.
    Object.assign(promotion, {
      ...updatePromotionDto,
      startDate: new Date(updatePromotionDto.startDate),
      endDate: new Date(updatePromotionDto.endDate)
    });

    return await this.promotionRepository.save(promotion);
  }

  // Méthode pour supprimer une promotion par son ID.
  // Elle utilise findOne pour vérifier l'existence avant de procéder à la suppression.
  async remove(id: number): Promise<void> {
    const promotion = await this.findOne(id);
    await this.promotionRepository.remove(promotion);
  }

  // Méthode pour récupérer toutes les promotions actives.
  // Une promotion est considérée comme active si la date actuelle est entre sa date de début et de fin.
  async getActivePromotions(): Promise<Promotion[]> {
    const now = new Date();

    return this.promotionRepository
      .createQueryBuilder('promotion')
      .where('DATE(promotion.startDate) <= DATE(:now)', { now }) // Comparaison des dates de début.
      .andWhere('DATE(promotion.endDate) >= DATE(:now)', { now }) // Comparaison des dates de fin.
      .getMany();
  }

  // Méthode pour créer une nouvelle promotion avec des validations supplémentaires.
  // Cette méthode semble redondante avec `create` et pourrait être fusionnée.
  async createPromotion(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const promotion = this.promotionRepository.create({
      description: createPromotionDto.description,
      startDate: new Date(createPromotionDto.startDate),
      endDate: new Date(createPromotionDto.endDate),
      discountPercentage: createPromotionDto.discountPercentage
    });

    return await this.promotionRepository.save(promotion);
  }
}
