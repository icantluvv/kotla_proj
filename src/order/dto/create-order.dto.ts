import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  lipstickId: number;

  @IsNotEmpty()
  @IsNumber()
  Quantity: number;
}
