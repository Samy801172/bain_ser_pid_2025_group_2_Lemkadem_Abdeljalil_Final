import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { ClientController } from './client.controller'; // Ajout de l'import du ClientController

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientService],
  exports: [ClientService], // Exporter ClientService pour qu'il puisse être utilisé dans d'autres modules
  controllers: [ClientController],
})
export class ClientModule {}
