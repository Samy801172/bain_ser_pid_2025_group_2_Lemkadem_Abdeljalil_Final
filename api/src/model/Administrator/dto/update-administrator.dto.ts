// src/dto/update-administrator.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAdministratorDto {
  @IsNotEmpty()
  @ApiProperty({ description: "The ID of the user (required)" })
  userId: number;

  @IsOptional()
  @ApiProperty({ description: "Optional: Username or other administrator properties to update" })
  user?: string; // Propriétés facultatives à mettre à jour (comme le nom d'utilisateur, par exemple)
}
