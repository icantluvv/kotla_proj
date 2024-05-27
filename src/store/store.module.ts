import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreEntity } from './entities/store.entity';
import { JwtModule } from '@nestjs/jwt';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([StoreEntity]),
    JwtModule,
    // StaffModule,
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
