import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Garde d'authentification JWT
 * Vérifie la validité du token JWT pour protéger les routes nécessitant une authentification.
 */
@Injectable() // Cette classe peut être injectée dans d'autres services de l'application
export class JwtAuthGuard extends AuthGuard('jwt') {
  
  /**
   * Gère la réponse de la stratégie d'authentification
   * Cette méthode est appelée lors de la validation du token JWT.
   * Si le token est invalide ou si un autre problème survient, elle lève une exception.
   * 
   * @param err - Erreur éventuelle survenue lors de la validation du token.
   * @param user - L'utilisateur authentifié si la validation est réussie, sinon `null`.
   * @param info - Informations supplémentaires sur l'authentification, comme des erreurs ou des détails spécifiques.
   * 
   * @throws UnauthorizedException si l'authentification échoue.
   */
  handleRequest(err: any, user: any, info: any) {
    // Si une erreur est présente ou si l'utilisateur n'est pas authentifié (null/undefined)
    if (err || !user) {
      // Enregistre l'erreur pour la déboguer
      console.error('Erreur JWT Guard:', { err, info });
      
      // Si une erreur est présente, la lancer. Sinon, on lève une exception UnauthorizedException
      throw err || new UnauthorizedException('Non authentifié');
    }

    // Si la validation a réussi, on retourne l'utilisateur authentifié
    return user;
  }
}
