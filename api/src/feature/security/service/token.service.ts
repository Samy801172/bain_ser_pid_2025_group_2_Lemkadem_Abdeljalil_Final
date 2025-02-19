import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Credential, RefreshTokenPayload, Token } from "../data";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "model/Client/client.entity";
import { configManager } from "@common/config/config.manager";
import { ConfigKey } from "@common/config/enum";
import { TokenExpiredException, TokenGenerationException } from "../security.exception";
import { ulid } from "ulid";

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(
    @InjectRepository(Token)
    private readonly repository: Repository<Token>, // Repository pour la gestion des tokens
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>, // Repository pour la gestion des credentials
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>, // Repository pour la gestion des clients
    private readonly jwtService: JwtService // Service pour la gestion des tokens JWT
  ) {}

  // Méthode pour obtenir un token d'authentification pour un utilisateur donné
  async getTokens(credential: Credential): Promise<Token> {
    try {
      // Supprimer tous les tokens existants pour l'utilisateur avant de créer de nouveaux tokens
      await this.deleteFor(credential);

      // Créer le payload pour le token, incluant l'ID du credential, l'email et le rôle (isAdmin)
      const payload = {
        credentialId: credential.credential_id,
        email: credential.mail,
        isAdmin: credential.isAdmin || false  // Vérifier si l'utilisateur est admin
      };

      // Générer un access token et un refresh token
      const [token, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: process.env.JWT_TOKEN_SECRET,  // Clé secrète pour le JWT
          expiresIn: '24h'  // Durée de validité du token
        }),
        this.jwtService.signAsync(payload, {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET, // Clé secrète pour le refresh token
          expiresIn: '7d' // Durée de validité du refresh token
        })
      ]);

      // Créer un nouvel objet Token et l'enregistrer dans la base de données
      const newToken = this.repository.create({
        token_id: ulid(),  // Générer un identifiant unique pour le token
        token,             // Le token d'authentification
        refreshToken,      // Le refresh token
        credential,        // L'utilisateur associé au token
        credentialId: credential.credential_id  // L'ID du credential associé
      });

      const savedToken = await this.repository.save(newToken); // Sauvegarder le token dans la base de données
      
      // Retourner le token avec les informations sur l'utilisateur
      return {
        ...savedToken,
        isAdmin: credential.isAdmin || false
      };
    } catch (error) {
      this.logger.error('Token generation error:', error); // Journaliser l'erreur si la génération du token échoue
      throw new TokenGenerationException();  // Lever une exception en cas d'erreur
    }
  }

  // Méthode pour supprimer tous les tokens associés à un utilisateur
  async deleteFor(credential: Credential): Promise<void> {
    try {
      // Supprimer les tokens existants de la base de données pour cet utilisateur
      await this.repository.delete({ credential: { credential_id: credential.credential_id } });
    } catch (error) {
      this.logger.error('Error deleting tokens:', error); // Journaliser l'erreur de suppression
      // Continuer l'exécution même si la suppression échoue
    }
  }

  // Méthode pour rafraîchir le token d'un utilisateur à partir d'un refresh token
  async refresh(payload: RefreshTokenPayload): Promise<Token> {
    try {
      // Vérifier le refresh token et décoder le payload
      const decoded = this.jwtService.verify(payload.refresh, {
        secret: configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET)  // Vérifier le refresh token avec la clé secrète
      });

      // Chercher le credential associé au refresh token
      const credential = await this.credentialRepository.findOneBy({
        credential_id: decoded.sub  // Récupérer le credential par son ID (sub du token)
      });

      if (!credential) {
        throw new UnauthorizedException('Credential not found'); // Si le credential n'est pas trouvé, lever une exception
      }

      // Si tout est valide, retourner un nouveau token
      return this.getTokens(credential);

    } catch (error) {
      this.logger.error('Refresh token error:', error); // Journaliser l'erreur de rafraîchissement
      throw new TokenExpiredException();  // Lever une exception si le token a expiré ou si une erreur est survenue
    }
  }
}
