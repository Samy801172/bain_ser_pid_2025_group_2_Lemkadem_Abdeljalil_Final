// src/dto/create-user.dto.ts
import { ApiProperty} from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { Column } from 'typeorm';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()

  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;// Le mot de passe normal, il sera haché dans le service
  @Column({ default: false }) // par défaut, l'utilisateur n'est pas admin
  @ApiProperty()
  isAdmin: boolean;
}

