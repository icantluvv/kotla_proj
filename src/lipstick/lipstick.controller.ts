import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { LipstickService } from './lipstick.service';
import { fileStorage } from './storage';
import { CreateLipstickDto } from './dto/create-lipstick.dto';
import { UpdateLipstickDto } from './dto/update-lipstick.dto';
import { LipstickEntity } from './entities/lipstick.entity';
import { DeleteResult } from 'typeorm';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@ApiTags('lipstick')
@Controller('lipstick')
@ApiBearerAuth()
export class LipstickController {
  constructor(private readonly lipstickService: LipstickService) {}
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  create(
    @Body() dto: CreateLipstickDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<LipstickEntity> {
    return this.lipstickService.create(dto, image);
  }

  @Get()
  findAll(): Promise<LipstickEntity[]> {
    return this.lipstickService.findAll();
  }

  @Get('/image/:path')
  download(@Param('path') path: string, @Response() response) {
    return response.sendFile(path, { root: './db_images/lipstick' });
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<LipstickEntity> {
    return this.lipstickService.findOne(+id);
  }
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateLipstickDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<LipstickEntity> {
    return this.lipstickService.update(+id, dto, image);
  }
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.lipstickService.delete(+id);
  }
}
