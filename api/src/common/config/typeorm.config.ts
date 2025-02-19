import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

/**
 * Configuration TypeORM pour la connexion à la base de données
 * Utilise les variables d'environnement pour les paramètres sensibles
 */
const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
  autoLoadEntities: true
};

// Pour les migrations
export const dataSource = new DataSource({
  ...typeOrmConfig,
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: false
} as any);

export { typeOrmConfig };
