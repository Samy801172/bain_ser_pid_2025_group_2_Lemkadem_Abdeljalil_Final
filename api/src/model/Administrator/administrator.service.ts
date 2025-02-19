import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrator } from './administrator.entity';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { User } from '../User/user.entity'; // Assurez-vous d'importer l'entité User
import { UserService } from 'model/User/user.service';

/**
 * Service de gestion des administrateurs
 * Gère la logique métier liée aux administrateurs
 */
@Injectable()
export class AdministratorService {
  constructor(
    @InjectRepository(Administrator)
    private readonly administratorRepository: Repository<Administrator>,
    @Inject(forwardRef(() => UserService))
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Crée un nouvel administrateur
   * @param createAdminDto - DTO contenant les données de l'administrateur
   * @returns L'administrateur créé
   */
  async create(createAdminDto: CreateAdministratorDto): Promise<Administrator> {
    const administrator = this.administratorRepository.create({
      user: { userId: createAdminDto.userId }
    });
    return await this.administratorRepository.save(administrator);
  }

  /**
   * Récupère tous les administrateurs avec leurs relations utilisateur
   */
  async findAll(): Promise<Administrator[]> {
    return this.administratorRepository.find({ relations: ['user'] });
  }

  /**
   * Trouve un administrateur par son ID
   * @param id - ID de l'administrateur
   * @throws NotFoundException si l'administrateur n'est pas trouvé
   */
  async findOne(id: number): Promise<Administrator> {
    const administrator = await this.administratorRepository.findOne({
      where: { adminId: id },
      relations: ['user'],
    });
    if (!administrator) {
      throw new NotFoundException(`Administrateur avec l'ID ${id} non trouvé`);
    }
    return administrator;
  }

  async update(id: number, updateAdministratorDto: UpdateAdministratorDto): Promise<Administrator> {
    const administrator = await this.findOne(id);
    const user = await this.userRepository.findOne({ where: { userId: updateAdministratorDto.userId } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${updateAdministratorDto.userId} non trouvé`);
    }

    this.administratorRepository.merge(administrator, {
      user,
      // Ajoutez d'autres propriétés si nécessaire
    });
    return this.administratorRepository.save(administrator);
  }

  async remove(id: number): Promise<void> {
    const administrator = await this.findOne(id);
    await this.administratorRepository.remove(administrator);
  }
}
