import { HttpException, ValidationError } from "@nestjs/common";
import { ApiCodeResponse } from "../enum";
import { ApiResponse } from '@common/config';
import { isNil, result } from "lodash";

/**
 * Classe personnalisée pour gérer les exceptions API
 * Étend la classe HttpException de NestJS
 */
export class ApiException extends HttpException {
  /**
   * @param code - Code de réponse API spécifique
   * @param status - Code de statut HTTP
   */
  constructor(code: ApiCodeResponse, status: number) {
    const apiResponse: ApiResponse = {
      code: code,
      data: null,
      result: false
    }
    super(apiResponse, status);
  }
}

/**
 * Classe spécialisée pour gérer les erreurs de validation
 * Étend la classe HttpException de NestJS
 */
export class ValidationException extends HttpException {
  /**
   * @param errors - Tableau d'erreurs de validation
   */
  constructor(errors: ValidationError[]) {
    const apiResponse: ApiResponse = {
      code: ApiCodeResponse.PAYLOAD_IS_NOT_VALID,
      data: errors.map((e: ValidationError) => validationErrorToApiCodeResponse(e)).flat(),
      result: false
    }
    super(apiResponse, 499);
  }
}

/**
 * Convertit une erreur de validation en tableau de codes de réponse API
 * @param error - L'erreur de validation à convertir
 * @returns Tableau de codes de réponse API
 */
export const validationErrorToApiCodeResponse = (error: ValidationError): ApiCodeResponse[] => {
  // Affichage des informations de débogage
  console.log(error.constraints);
  console.log(Object.keys(error.constraints));
  console.log(Object.values(error.constraints));

  return Object.keys(error.constraints).map((k: string) => {
    // Construction de la clé pour le code de réponse
    console.log(`${camelToSnake(error.property)}_${camelToSnake(k)}`, `${camelToSnake(error.property)}_${camelToSnake(k)}`);
    const code = ApiCodeResponse[`${camelToSnake(error.property)}_${camelToSnake(k)}` as
      keyof typeof ApiCodeResponse];
    // Retourne un code par défaut si le code spécifique n'existe pas
    return isNil(code) ? ApiCodeResponse.PAYLOAD_PARAM_IS_MISSING : code;
  });
}

/**
 * Convertit une chaîne de caractères du format camelCase vers SNAKE_CASE
 * @param str - Chaîne en camelCase à convertir
 * @returns Chaîne convertie en SNAKE_CASE
 */
export const camelToSnake = (str: string): string => {
  return str.replace(/([A-Z])/g, " $1").split(' ').join('_').toUpperCase();
}