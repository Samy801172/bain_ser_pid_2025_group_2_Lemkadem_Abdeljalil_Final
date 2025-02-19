import { INestApplication } from "@nestjs/common";
import {SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

/**
 * Classe de configuration Swagger pour la documentation API
 */
class SwaggerConfiguration {
  constructor() {
  }

  /**
   * Configure la documentation Swagger pour l'application
   * @param app - Instance de l'application NestJS
   */
  config(app: INestApplication<any>) {
    const config = new DocumentBuilder()
      .setTitle('NestJS API')
      .setDescription('NestJS swagger document')
      .setVersion('1.0')
      .addBearerAuth(
        {
          description: `Please enter token`,
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header'
        },
        'access-token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
}

// Export d'une instance unique
const swaggerConfiguration = new SwaggerConfiguration();
export {swaggerConfiguration};