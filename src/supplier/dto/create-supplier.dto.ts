import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  Phone: string;

  @IsNotEmpty()
  @IsString()
  Adress: string;

  @IsNotEmpty()
  @IsString()
  Country: string;

  @IsNotEmpty()
  @IsString()
  Supplier_Name: string;
}
