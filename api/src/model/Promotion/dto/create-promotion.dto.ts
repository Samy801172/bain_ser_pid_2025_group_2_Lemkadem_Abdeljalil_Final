import { IsNotEmpty, IsString, IsDateString, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Promotion de Noël', description: 'Description de la promotion' })
  description: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2024-12-01T00:00:00.000Z', description: 'Date de début de la promotion' })
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2024-12-31T23:59:59.999Z', description: 'Date de fin de la promotion' })
  endDate: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(100)
  @ApiProperty({
    example: 20,
    description: 'Pourcentage de réduction',
    minimum: 0,
    maximum: 100
  })
  discountPercentage: number;
}