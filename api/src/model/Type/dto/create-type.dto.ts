// src/dto/create-type.dto.ts
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
