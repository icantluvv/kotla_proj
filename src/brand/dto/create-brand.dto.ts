import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  Brand_Name: string;

  @IsNotEmpty()
  @IsNumber()
  Brand_Code: number;
}
