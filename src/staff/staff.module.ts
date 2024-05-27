import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from './entities/staff.entity';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { JwtModule } from '@nestjs/jwt';
import { StaffController } from './staff.controller';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffEntity]),
    ScheduleModule,
    JwtModule,
    StoreModule,
    ConfigModule,
  ],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
