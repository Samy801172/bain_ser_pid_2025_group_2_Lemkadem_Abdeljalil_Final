import { createParamDecorator, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';

// Interface pour définir la structure attendue de l'utilisateur
interface JwtUser {
  credentialId: number;
  clientId: number;
  isAdmin: boolean;
  email?: string;
  roles?: string[];
  // autres propriétés...
}

export const User = createParamDecorator(
  (data: keyof JwtUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtUser | undefined;

    // Vérification de base de l'utilisateur
    if (!user) {
      throw new UnauthorizedException(
        'Aucun utilisateur trouvé dans la requête. Veuillez vous authentifier.'
      );
    }

    // Si une propriété spécifique est demandée
    if (data) {
      // Vérifier que la propriété existe
      if (!(data in user)) {
        throw new BadRequestException(
          `La propriété '${data}' n'existe pas dans l'objet utilisateur`
        );
      }

      // Traitement spécial pour clientId
      if (data === 'clientId') {
        const clientId = Number(user[data]);
        if (isNaN(clientId)) {
          throw new BadRequestException('ID client invalide');
        }
        return clientId;
      }

      // Traitement spécial pour isAdmin
      if (data === 'isAdmin') {
        return Boolean(user[data]);
      }

      return user[data];
    }

    // Si aucune propriété n'est spécifiée, retourner l'utilisateur complet
    return user;
  },
);