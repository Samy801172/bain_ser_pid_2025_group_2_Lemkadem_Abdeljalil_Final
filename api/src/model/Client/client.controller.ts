// src/controllers/client.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ClientService } from './client.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateClientDto } from './dto/create-client.dto';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get('credential/:credentialId')
  async findByCredentialId(@Param('credentialId') credentialId: string) {
    const client = await this.clientService.findByCredentialId(credentialId);
    if (!client) {
      throw new NotFoundException('Client non trouvé');
    }
    return client;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientService.remove(id);
  }

 }
