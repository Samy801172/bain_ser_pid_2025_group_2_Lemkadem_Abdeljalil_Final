import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import { ConfigKey, configMinimalKeys } from "./enum";

require('dotenv').config();

/**
 * Gestionnaire de configuration de l'application
 */
class ConfigManager {
  /**
   * @param env - Objet contenant les variables d'environnement
   */
  constructor(private env: { [k: string]: string | undefined }) {}

  /**
   * Vérifie la présence des clés de configuration requises
   * @param keys - Tableau des clés à vérifier
   */
  public ensureValues(keys: ConfigKey[]): ConfigManager {
    keys.forEach((k: ConfigKey) => this.getValue(k, true));
    return this;
  }

  /**
   * Retourne la configuration TypeORM
   */
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: this.getValue(ConfigKey.DB_TYPE) as any,
      host: this.getValue(ConfigKey.DB_HOST),
      port: parseInt(this.getValue(ConfigKey.DB_PORT)),
      username: this.getValue(ConfigKey.DB_USER),
      password: this.getValue(ConfigKey.DB_PASSWORD),
      database: this.getValue(ConfigKey.DB_DATABASE),
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: (this.getValue(ConfigKey.DB_SYNC)=== 'true'),
    }
  }

  /**
   * Récupère la valeur d'une clé de configuration
   * @param key - Clé de configuration
   * @param throwOnMissing - Lance une erreur si la clé est manquante
   */
  getValue(key: ConfigKey, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }
}

// Export d'une instance unique avec vérification des clés minimales
const configManager = new ConfigManager(process.env).ensureValues(configMinimalKeys);
export {configManager}