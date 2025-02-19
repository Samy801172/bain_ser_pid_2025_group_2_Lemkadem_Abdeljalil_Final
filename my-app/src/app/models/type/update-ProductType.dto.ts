// src/app/dto/update-type.dto.ts
import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateProductTypeDto {
  @IsOptional() // Ce champ est facultatif pour la mise à jour
  @IsNotEmpty()
  name?: string; // Nom du type de produit (facultatif pour la mise à jour)
}
