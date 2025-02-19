// src/guards/admin.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

/**
 * Garde de sécurité pour protéger les routes administrateur
 * Vérifie si l'utilisateur a les droits d'administration
 */
@Injectable()  // Décoration pour déclarer la classe comme injectable dans le système de dépendances
export class AdminGuard implements CanActivate {
  
  /**
   * Vérifie si l'utilisateur peut accéder à la route
   * @param context - Contexte d'exécution de la requête
   * @throws UnauthorizedException si l'utilisateur n'est pas admin
   * @returns true si l'accès est autorisé
   */
  canActivate(context: ExecutionContext): boolean {
    // Récupération de la requête HTTP à partir du contexte d'exécution
    const request = context.switchToHttp().getRequest();
    
    // Récupération de l'utilisateur depuis la requête
    const user = request.user;

    // Vérifie si l'utilisateur existe et s'il a le rôle administrateur
    if (!user || !user.isAdmin) {
      // Si l'utilisateur n'est pas un administrateur, une exception Unauthorized est lancée
      throw new UnauthorizedException('Accès réservé aux administrateurs');
    }

    // Si l'utilisateur est administrateur, l'accès est autorisé
    return true;
  }
}
