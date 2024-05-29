import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateToDeliveryDto {
  @IsNumber()
  @IsNotEmpty()
  supplierId: number;

  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}
