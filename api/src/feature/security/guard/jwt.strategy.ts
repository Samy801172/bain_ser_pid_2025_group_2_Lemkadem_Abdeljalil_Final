import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ClientService } from 'model/Client/client.service';

/**
 * Interface définissant la structure du payload JWT
 * Le payload contient les informations que l'on récupère lors de la validation du token JWT.
 */
interface JwtPayload {
  sub: string;   // Identifiant unique de l'utilisateur (généralement ID utilisateur)
  email: string; // Email de l'utilisateur
  isAdmin: boolean; // Indique si l'utilisateur est administrateur
  iat: number;   // Date d'émission du token
  exp: number;   // Date d'expiration du token
}

/**
 * Stratégie de validation des tokens JWT
 * La stratégie s'active pour chaque requête contenant un token JWT.
 */
@Injectable() // Rendre cette classe injectable pour l'injection de dépendances
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name); // Initialisation du logger pour cette classe

  constructor(private clientService: ClientService) {
    super({
      // Paramètres de la stratégie JWT
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraire le token depuis l'en-tête Authorization
      ignoreExpiration: false, // Ne pas ignorer l'expiration du token
      secretOrKey: process.env.JWT_TOKEN_SECRET // Clé secrète utilisée pour signer et valider les tokens
    });
  }

  /**
   * Valide le payload JWT et récupère les informations utilisateur
   * Cette méthode est appelée pour vérifier l'intégrité du token et les informations qu'il contient.
   * @param payload - Payload du token JWT, contient les informations de l'utilisateur
   * @throws UnauthorizedException si la validation échoue
   * @returns Informations utilisateur validées, qui seront attachées à la requête
   */
  async validate(payload: JwtPayload): Promise<any> {
    try {
      // Log du payload reçu pour débogage
      this.logger.debug('JWT Payload:', payload);

      // Vérification spéciale pour les utilisateurs administrateurs
      if (payload.isAdmin) {
        this.logger.debug('Utilisateur admin détecté');
        return {
          credentialId: payload.sub, // Récupérer l'ID utilisateur (sub) depuis le payload
          email: payload.email, // Email de l'utilisateur
          isAdmin: true // Marquer cet utilisateur comme admin
        };
      }

      // Si l'utilisateur n'est pas admin, rechercher le client dans la base de données
      const client = await this.clientService.findByCredentialId(payload.sub); // Chercher le client par son ID
      this.logger.debug('Client trouvé:', client);

      // Si le client n'est pas trouvé dans la base et que l'utilisateur n'est pas admin, lever une exception
      if (!client && !payload.isAdmin) {
        this.logger.error(`Client non trouvé pour credential ${payload.sub}`);
        throw new UnauthorizedException('Client non trouvé');
      }

      // Retourner les informations de l'utilisateur et du client validées
      return {
        credentialId: payload.sub,  // ID utilisateur
        clientId: client?.clientId, // ID du client, si trouvé
        email: payload.email,       // Email de l'utilisateur
        isAdmin: payload.isAdmin    // Indiquer si l'utilisateur est administrateur
      };
    } catch (error) {
      // Log de l'erreur si une exception est levée lors de la validation
      this.logger.error('Erreur validation JWT:', error);
      throw new UnauthorizedException('Token invalide'); // Lever une exception si la validation échoue
    }
  }
}
