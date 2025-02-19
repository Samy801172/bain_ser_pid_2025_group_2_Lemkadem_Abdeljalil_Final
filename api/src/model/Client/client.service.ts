// Importation des modules nécessaires de NestJS et TypeORM
import { Injectable, NotFoundException } from '@nestjs/common'; // Injectable pour le service, NotFoundException pour les erreurs
import { InjectRepository } from '@nestjs/typeorm'; // Pour injecter le repository TypeORM
import { Repository } from 'typeorm'; // Repository pour interagir avec la base de données
import { Client } from './client.entity'; // Entité Client qui représente un client dans la base de données
import { CreateClientDto } from './dto/create-client.dto'; // DTO pour la création d'un client
import { UpdateClientDto } from './dto/update-client.dto'; // DTO pour la mise à jour d'un client

@Injectable() // Décorateur pour marquer cette classe comme un service injectable
export class ClientService {
  constructor(
    @InjectRepository(Client) // Injection du repository TypeORM pour l'entité Client
    private readonly clientRepository: Repository<Client>,
  ) {}

  // Méthode pour créer un nouveau client
  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepository.create(createClientDto); // Crée un client à partir du DTO
    return this.clientRepository.save(client); // Sauvegarde le client dans la base de données
  }

  // Méthode pour récupérer tous les clients
  async findAll(): Promise<Client[]> {
    return this.clientRepository.find(); // Récupère tous les clients
  }

  // Méthode pour récupérer un client par son ID
  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { clientId: id } }); // Recherche du client par ID
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`); // Si aucun client n'est trouvé, une exception est levée
    }
    return client; // Retourne le client trouvé
  }

  // Méthode pour mettre à jour un client existant
  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id); // Recherche le client
    Object.assign(client, updateClientDto); // Assigne les nouvelles valeurs au client
    return this.clientRepository.save(client); // Sauvegarde le client mis à jour
  }

  // Méthode pour supprimer un client
  async remove(id: number): Promise<void> {
    const client = await this.findOne(id); // Recherche le client
    await this.clientRepository.remove(client); // Supprime le client de la base de données
  }

  // Méthode pour rechercher un client par son identifiant de credential
  async findByCredentialId(credentialId: string): Promise<Client | null> {
    console.log('Recherche client pour credential:', credentialId); // Affiche l'identifiant de credential recherché
    const client = await this.clientRepository
      .createQueryBuilder('client') // Création d'un query builder pour interroger la base
      .leftJoinAndSelect('client.credential', 'credential') // Jointure avec l'entité "credential"
      .where('credential.credential_id = :credentialId', { credentialId }) // Condition de recherche
      .getOne(); // Récupère le premier résultat correspondant

    console.log('Client trouvé:', client); // Affiche le client trouvé (si applicable)
    return client; // Retourne le client trouvé
  }
}
