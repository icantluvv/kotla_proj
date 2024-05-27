import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  Name: string;

  @IsNotEmpty()
  @IsString()
  Email: string;

  @IsNotEmpty()
  @IsString()
  Adress: string;
}
