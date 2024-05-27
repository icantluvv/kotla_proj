import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  Brand_Name: string;

  @IsNotEmpty()
  @IsNumberString()
  Brand_Code: number;

  @IsNotEmpty()
  @IsNumber()
  count: number;
}
