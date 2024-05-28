import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  lipstickId: number;

  @IsNotEmpty()
  @IsNumber()
  Quantity: number;
}
