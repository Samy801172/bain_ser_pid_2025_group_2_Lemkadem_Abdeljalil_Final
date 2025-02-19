import { Injectable } from "@nestjs/common";
import { SayHelloException } from "./app.exception";

/**
 * Service principal de l'application
 * Gère la logique métier de base
 */
@Injectable()
export class AppService {
  /**
   * Retourne un message de bienvenue
   * @returns Message de bienvenue personnalisé
   * @throws SayHelloException si l'utilisateur n'est pas admin
   */
  getHello(): string {
    this.checkIfIsAdmin(true);
    return 'Hello SAMY';
  }

  /**
   * Vérifie si l'utilisateur est administrateur
   * @param admin - Booléen indiquant si l'utilisateur est admin
   * @throws SayHelloException si l'utilisateur n'est pas admin
   */
  checkIfIsAdmin(admin: boolean): void {
    if (!admin) {
      throw new SayHelloException();
    }
  }
}