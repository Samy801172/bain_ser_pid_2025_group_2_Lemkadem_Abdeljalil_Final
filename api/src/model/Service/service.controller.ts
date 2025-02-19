// src/model/Service/service.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpException,
  NotFoundException
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('services')
@ApiBearerAuth('access-token')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    try {
      return await this.serviceService.create(createServiceDto);
    } catch (error) {
      console.error('Error creating service:', error);
      throw new HttpException('Error creating service', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.serviceService.findAll();
    } catch (error) {
      console.error('Error fetching services:', error);
      throw new HttpException('Error fetching services', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.serviceService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException('Error fetching service', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceDto: UpdateServiceDto
  ) {
    try {
      return await this.serviceService.update(id, updateServiceDto);
    } catch (error) {
      console.error('Error updating service:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException('Error updating service', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.serviceService.remove(id);
      return { message: 'Service successfully deleted' };
    } catch (error) {
      if (error.code === '23503') {
        throw new HttpException(
          'Ce service ne peut pas être supprimé car il est lié à des rendez-vous',
          HttpStatus.CONFLICT
        );
      }
      throw new HttpException('Error deleting service', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}