import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateLipstickDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: Express.Multer.File;

  @IsNumberString()
  @IsNotEmpty()
  Price: number;

  @IsString()
  @IsNotEmpty()
  Color: string;

  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsNumberString()
  @IsNotEmpty()
  brandId: number;

  @IsNumberString()
  @IsNotEmpty()
  storeId: number;
}
