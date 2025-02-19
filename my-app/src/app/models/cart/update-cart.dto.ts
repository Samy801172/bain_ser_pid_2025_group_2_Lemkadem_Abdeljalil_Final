// backend/src/model/Cart/dto/update-cart.dto.ts
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateCartDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity ?: number;
}
