// models/type/create-type.dto.ts
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTypeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string = ''; // Initialisation par défaut

  @IsNotEmpty()
  @IsString()
  description: string = ''; // Initialisation par défaut

  @IsNotEmpty()
  @IsString()
  icon: string = ''; // Initialisation par défaut

  constructor(partial?: Partial<CreateTypeDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
