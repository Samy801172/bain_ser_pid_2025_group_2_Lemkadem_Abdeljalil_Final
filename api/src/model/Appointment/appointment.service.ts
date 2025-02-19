import { Injectable, NotFoundException } from '@nestjs/common'; // Import des modules nécessaires
import { InjectRepository } from '@nestjs/typeorm'; // Permet d'injecter le repository de l'entité Appointment
import { Repository } from 'typeorm'; // Repository pour gérer les opérations CRUD
import { CreateAppointmentDto } from './dto/create-appointment.dto'; // DTO pour la création d'un rendez-vous
import { Appointment } from './appointment.entity'; // Entité Appointment
import { UpdateAppointmentDto } from './dto/update-appointment.dto'; // DTO pour la mise à jour d'un rendez-vous

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment) // Injecte le repository de l'entité Appointment
    private readonly appointmentRepository: Repository<Appointment>, // Déclaration du repository
  ) {}

  // Crée un nouveau rendez-vous
  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentRepository.create(createAppointmentDto); // Crée un objet Appointment à partir du DTO
    return this.appointmentRepository.save(appointment); // Sauvegarde l'objet dans la base de données
  }

  // Récupère tous les rendez-vous
  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({ relations: ['service', 'client', 'administrator'] }); // Retourne tous les rendez-vous avec leurs relations
  }

  // Récupère un rendez-vous spécifique par son ID
  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { appointmentId: id }, // Recherche un rendez-vous avec l'ID donné
      relations: ['service', 'client', 'administrator'], // Inclut les relations de service, client et administrateur
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`); // Si aucun rendez-vous trouvé, lève une exception
    }
    return appointment; // Retourne le rendez-vous trouvé
  }

  // Met à jour un rendez-vous existant
  async update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id); // Recherche le rendez-vous avec l'ID
    Object.assign(appointment, updateAppointmentDto); // Applique les changements du DTO à l'objet Appointment
    return this.appointmentRepository.save(appointment); // Sauvegarde le rendez-vous mis à jour
  }

  // Supprime un rendez-vous
  async remove(id: number): Promise<void> {
    const appointment = await this.findOne(id); // Recherche le rendez-vous à supprimer
    await this.appointmentRepository.remove(appointment); // Supprime le rendez-vous trouvé
  }
}
