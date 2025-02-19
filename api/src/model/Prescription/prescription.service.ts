// src/model/Prescription/prescription.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription, PrescriptionStatus } from './prescription.entity';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Client } from '../Client/client.entity';

/**
 * Service gérant les opérations liées aux prescriptions médicales.
 * Permet la création, lecture, mise à jour et suppression des prescriptions,
 * ainsi que leur vérification par un pharmacien.
 */
@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ) {}

  /**
   * Crée une nouvelle prescription pour un client.
   * @param createPrescriptionDto - Les données de la prescription à créer
   * @throws NotFoundException si le client n'existe pas
   * @returns La prescription créée avec ses relations
   */
  async create(createPrescriptionDto: CreatePrescriptionDto): Promise<Prescription> {
    // Vérifie l'existence du client
    const client = await this.clientRepository.findOne({
      where: { clientId: createPrescriptionDto.client_id }
    });

    if (!client) {
      throw new NotFoundException(
        `Client avec l'ID ${createPrescriptionDto.client_id} non trouvé`
      );
    }

    // Crée une nouvelle instance de prescription
    const prescription = this.prescriptionRepository.create({
      client_id: client.clientId,
      prescribed_by: createPrescriptionDto.prescribed_by,
      medication_details: createPrescriptionDto.medication_details,
      // Si pas de date d'expiration fournie, ajoute 30 jours par défaut
      expiry_date: createPrescriptionDto.expiry_date ||
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      file_url: createPrescriptionDto.file_url,
      is_custom: createPrescriptionDto.is_custom,
      notes: createPrescriptionDto.notes,
      status: PrescriptionStatus.PENDING
    });

    const savedPrescription = await this.prescriptionRepository.save(prescription);
    return this.findOne(savedPrescription.id_prescription);
  }

  /**
   * Récupère toutes les prescriptions avec leurs relations client.
   * Les résultats sont triés par date de création décroissante.
   * @returns Liste des prescriptions
   */
  async findAll(): Promise<Prescription[]> {
    return this.prescriptionRepository.find({
      relations: ['client'],
      order: {
        issue_date: 'DESC'
      }
    });
  }

  /**
   * Trouve une prescription spécifique par son ID.
   * @param id - L'ID de la prescription recherchée
   * @throws NotFoundException si la prescription n'existe pas
   * @returns La prescription avec ses relations
   */
  async findOne(id: number): Promise<Prescription> {
    const prescription = await this.prescriptionRepository.findOne({
      where: { id_prescription: id },
      relations: ['client']
    });

    if (!prescription) {
      throw new NotFoundException(`Prescription #${id} non trouvée`);
    }

    return prescription;
  }

  /**
   * Met à jour une prescription existante.
   * @param id - L'ID de la prescription à mettre à jour
   * @param updatePrescriptionDto - Les nouvelles données de la prescription
   * @throws NotFoundException si la prescription ou le nouveau client n'existe pas
   * @returns La prescription mise à jour
   */
  async update(
    id: number,
    updatePrescriptionDto: UpdatePrescriptionDto
  ): Promise<Prescription> {
    const prescription = await this.findOne(id);

    // Vérifie l'existence du nouveau client si l'ID client est modifié
    if (updatePrescriptionDto.client_id) {
      const client = await this.clientRepository.findOne({
        where: { clientId: updatePrescriptionDto.client_id }
      });

      if (!client) {
        throw new NotFoundException(
          `Client #${updatePrescriptionDto.client_id} non trouvé`
        );
      }

      prescription.client_id = client.clientId;
    }

    // Met à jour les champs modifiables en conservant les valeurs existantes si non fournies
    const updatedPrescription = {
      ...prescription,
      prescribed_by: updatePrescriptionDto.prescribed_by ?? prescription.prescribed_by,
      medication_details: updatePrescriptionDto.medication_details ??
        prescription.medication_details,
      expiry_date: updatePrescriptionDto.expiry_date ?? prescription.expiry_date,
      file_url: updatePrescriptionDto.file_url ?? prescription.file_url,
      is_custom: updatePrescriptionDto.is_custom ?? prescription.is_custom,
      notes: updatePrescriptionDto.notes ?? prescription.notes
    };

    await this.prescriptionRepository.save(updatedPrescription);
    return this.findOne(id);
  }

  /**
   * Supprime une prescription.
   * @param id - L'ID de la prescription à supprimer
   * @throws NotFoundException si la prescription n'existe pas
   */
  async remove(id: number): Promise<void> {
    const prescription = await this.findOne(id);
    await this.prescriptionRepository.remove(prescription);
  }

  /**
   * Récupère toutes les prescriptions d'un client spécifique.
   * @param clientId - L'ID du client
   * @returns Liste des prescriptions du client, triées par date de création
   */
  async findAllByClient(clientId: number): Promise<Prescription[]> {
    return this.prescriptionRepository.find({
      where: { client_id: clientId },
      relations: ['client'],
      order: {
        issue_date: 'DESC'
      }
    });
  }

  /**
   * Vérifie une prescription par un pharmacien.
   * Met à jour le statut et ajoute les informations de vérification.
   * @param id - L'ID de la prescription à vérifier
   * @param pharmacistId - L'ID du pharmacien effectuant la vérification
   * @param status - Le nouveau statut de la prescription
   * @returns La prescription mise à jour
   */
  async verifyPrescription(
    id: number,
    pharmacistId: number,
    status: PrescriptionStatus
  ): Promise<Prescription> {
    const prescription = await this.findOne(id);

    prescription.status = status;
    prescription.verified_by = pharmacistId;
    prescription.verification_date = new Date();

    return this.prescriptionRepository.save(prescription);
  }
}