import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandEntity } from './entities/brand.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([BrandEntity]), JwtModule],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}
