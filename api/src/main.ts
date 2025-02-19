import { NestFactory } from '@nestjs/core';
import { ApiInterceptor, HttpExceptionFilter, swaggerConfiguration } from '@common/config';
import { ValidationPipe, Logger, BadRequestException } from '@nestjs/common';
import { configManager } from '@common/config';
import { ConfigKey } from '@common/config/enum';
import { AppModule } from './feature';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  // Configuration pour gérer les fichiers
  app.use(json({ limit: '50mb' })); // Permet de gérer des requêtes JSON volumineuses
  app.use(urlencoded({ extended: true, limit: '50mb' })); // Permet de gérer des requêtes encodées en URL volumineuses

  // Activer CORS
  app.enableCors({
    origin: true, // Permettre toutes les origines pendant le développement
    credentials: true // Autoriser les cookies et les en-têtes d'authentification
  });

  app.useGlobalFilters(new HttpExceptionFilter()); // Gestion centralisée des exceptions
  app.setGlobalPrefix(configManager.getValue(ConfigKey.APP_BASE_URL) || 'api'); // Définit un préfixe global pour l'API
  
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors = []) => {
        const messages = validationErrors.map(error => error.toString()).join(', ');
        throw new BadRequestException(messages); // Gestion des erreurs de validation
      }
    })
  );

  // Swagger configuration pour la documentation de l'API
  swaggerConfiguration.config(app);

  await app.listen(2024); // IMPORTANT: Fixer le port à 2024
  const logger: Logger = new Logger('Main Logger');
  logger.log('Server running on port 2024'); // Message de confirmation au démarrage
}

bootstrap().catch((error) => {
  console.error(error); // Log en cas d'erreur critique
  process.exit(1); // Quitter l'application en cas d'échec
});
