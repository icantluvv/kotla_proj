import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { LipstickService } from './lipstick.service';
import { LipstickController } from './lipstick.controller';
import { LipstickEntity } from './entities/lipstick.entity';
import { BrandModule } from 'src/brand/brand.module';
import { BrandEntity } from 'src/brand/entities/brand.entity';
import { JwtModule } from '@nestjs/jwt';
import { StoreModule } from 'src/store/store.module';
import { StoreEntity } from 'src/store/entities/store.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([LipstickEntity]),
    JwtModule,
    BrandEntity,
    StoreModule,
    StoreEntity,
    BrandModule,
  ],
  controllers: [LipstickController],
  providers: [LipstickService],
  exports: [LipstickService],
})
export class LipstickModule {}
