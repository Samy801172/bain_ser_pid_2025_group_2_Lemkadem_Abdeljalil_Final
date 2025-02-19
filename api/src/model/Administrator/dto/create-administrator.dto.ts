// src/dto/create-administrator.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAdministratorDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  userId: number; // The ID of the user
  @ApiProperty()
  ID_admin: number; // Si c'est auto-généré, ne l'incluez pas ici
  @ApiProperty()
  user: string; // Assurez-vous que cela existe dans l'entité
}

