import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClientService } from '../../../model/Client/client.service';

/**
 * Garde d'authentification JWT personnalisée
 * Vérifie la validité du token JWT et effectue des vérifications supplémentaires pour l'accès
 */
@Injectable()  // Déclare la classe comme injectable dans le système de dépendances
export class JwtGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtGuard.name);  // Initialisation du logger pour cette classe

  constructor(private clientService: ClientService) {
    super();  // Appel du constructeur de AuthGuard pour initialiser la garde
  }

  /**
   * Vérifie si l'utilisateur peut accéder à la route protégée
   * @param context - Contexte de l'exécution de la requête (contenant les informations sur l'utilisateur)
   * @returns true si l'accès est autorisé, false si non
   * @throws UnauthorizedException si l'utilisateur n'est pas authentifié ou autorisé
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Appel de la méthode canActivate de la classe AuthGuard pour vérifier la validité du token JWT
      const canActivate = await super.canActivate(context);
      if (!canActivate) {
        return false;  // Si l'accès n'est pas autorisé par AuthGuard, retourner false
      }

      // Récupération de la requête et de l'utilisateur depuis le contexte
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      // Si l'utilisateur ne contient pas un identifiant de crédentiel, lever une exception d'authentification
      if (!user?.credentialId) {
        throw new UnauthorizedException('Token invalide');
      }

      // Vérification explicite pour les administrateurs
      if (user.isAdmin === true) {
        this.logger.debug('Accès admin autorisé');  // Log de l'accès autorisé pour un admin
        request.user = user;
        return true;  // L'utilisateur est un admin, l'accès est autorisé
      }

      // Pour les utilisateurs non-admin, effectuer une vérification supplémentaire pour le client
      const client = await this.clientService.findByCredentialId(user.credentialId);
      if (!client) {
        throw new UnauthorizedException('Client non trouvé');  // Si aucun client n'est trouvé, lever une exception
      }

      // Si un client est trouvé, l'attacher à la requête
      request.client = client;
      request.user = user;  // Attacher l'utilisateur authentifié à la requête
      return true;  // L'accès est autorisé
    } catch (error) {
      this.logger.error('JWT validation error:', error);  // Log de l'erreur
      throw error;  // Lancer l'erreur pour qu'elle soit captée par le gestionnaire d'erreurs global
    }
  }
}
