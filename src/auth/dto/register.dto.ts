import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Nickname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
