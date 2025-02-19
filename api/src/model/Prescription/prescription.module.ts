// src/model/Prescription/prescription.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { Prescription } from './prescription.entity';
import { Client } from '../Client/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prescription, Client])],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
  exports: [PrescriptionService,TypeOrmModule]
})
export class PrescriptionModule {}