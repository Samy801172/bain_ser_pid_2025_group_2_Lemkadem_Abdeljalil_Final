import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';

import { User } from './user.entity';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

import { JwtGuard } from '@feature/security';
import { UserService } from './user.service';
@UseGuards(JwtGuard) // Protège cette route avec JWT
@ApiTags('user')
@ApiBearerAuth('access-token') // Indique que ce contrôleur nécessite un token d'accès
@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all users.', type: [User] })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'User found.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(+id);
  }
}
