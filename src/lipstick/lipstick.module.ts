import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { LipstickService } from './lipstick.service';
import { LipstickController } from './lipstick.controller';
import { LipstickEntity } from './entities/lipstick.entity';
// import { CategoryModule } from 'src/category/category.module';
// import { CategoryEntity } from 'src/category/entities/category.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([LipstickEntity]),
    JwtModule,
  ],
  controllers: [LipstickController],
  providers: [LipstickService],
  exports: [LipstickService],
})
export class LipstickModule {}
