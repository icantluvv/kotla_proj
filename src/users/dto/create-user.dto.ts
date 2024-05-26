import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  Phone: string;

  @IsNotEmpty()
  @IsString()
  Nickname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be more then 8 symbols' })
  password: string;
}
