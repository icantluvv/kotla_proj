import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

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
  Price: number;

  @IsString()
  Color: string;

  @IsString()
  Name: string;

  // @IsNumberString()
  // categoryId: number;
}
