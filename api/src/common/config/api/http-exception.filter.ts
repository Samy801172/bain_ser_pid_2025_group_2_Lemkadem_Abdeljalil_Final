import { Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";

/**
 * Filtre qui intercepte et traite toutes les exceptions HTTP
 * @decorator @Catch(HttpException) - Capture uniquement les exceptions HTTP
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * Méthode qui traite l'exception capturée
   * @param exception - L'exception HTTP capturée
   * @param host - Le contexte d'exécution de la requête
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    // Récupération du contexte HTTP
    const ctx = host.switchToHttp();
    // Récupération de l'objet response
    const response = ctx.getResponse<Response>();
    // Envoi de la réponse avec le statut et le message d'erreur
    response
      .status(exception.getStatus())
      .json(exception.getResponse());
  }
}
