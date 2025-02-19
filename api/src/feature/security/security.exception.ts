/**
 * Classes d'exceptions personnalisées pour la gestion de la sécurité
 * Chaque classe étend ApiException avec un code et un statut spécifique
 */

import { ApiException } from '@common/config/api/model/api.exception';
import { ApiCodeResponse } from '@common/config';

/**
 * Exception levée quand aucun token n'est trouvé
 */
export class NoTokenFoundedException extends ApiException {
  constructor(message: string = 'No token found') {
    super(ApiCodeResponse.NO_TOKEN_FOUNDED, 401);
  }
}

/**
 * Exception levée quand un utilisateur n'est pas trouvé
 */
export class UserNotFoundException extends ApiException {
  constructor(message: string = 'User not found') {
    super(ApiCodeResponse.USER_NOT_FOUND, 200);
  }
}

/**
 * Exception levée quand le token a expiré
 */
export class TokenExpiredException extends ApiException {
  constructor(message: string = 'Token expired') {
    super(ApiCodeResponse.TOKEN_EXPIRED, 401);
  }
}

/**
 * Exception levée lors d'un échec d'inscription
 */
export class SignupException extends ApiException {
  constructor(message: string = 'Signup error') {
    super(ApiCodeResponse.SIGNUP_ERROR, 200);
  }
}

/**
 * Exception levée lors d'un échec de suppression de crédentiel
 */
export class CredentialDeleteException extends ApiException {
  constructor(message: string = 'Credential delete error') {
    super(ApiCodeResponse.CREDENTIAL_DELETE_ERROR, 200);
  }
}

/**
 * Exception levée quand un utilisateur existe déjà
 */
export class UserAlreadyExistException extends ApiException {
  constructor(message: string = 'User already exists') {
    super(ApiCodeResponse.USER_ALREADY_EXIST, 200);
  }
}

/**
 * Exception levée lors d'une erreur de génération de token
 */
export class TokenGenerationException extends ApiException {
  constructor(message: string = 'Token generation error') {
    super(ApiCodeResponse.TOKEN_GEN_ERROR, 500);
  }
}
