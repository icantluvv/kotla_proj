import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateStaffDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  Phone: string;

  @IsNotEmpty()
  @IsString()
  First_Name: string;

  @IsNotEmpty()
  @IsString()
  Last_Name: string;

  @IsNotEmpty()
  @IsNumberString()
  storeId: number;

  @IsNotEmpty()
  @IsNumberString()
  scheduleId: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be more then 8 symbols' })
  password: string;
}
