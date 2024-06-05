import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPostgresConfig } from './config/postgres.config';
import { LipstickModule } from './lipstick/lipstick.module';
import { UserModule } from './users/users.module';
import { StaffModule } from './staff/staff.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { RoleModule } from './roles/roles.module';
import { ScheduleModule } from './schedule/schedule.module';
import { StoreModule } from './store/store.module';
import { OrderModule } from './order/order.module';
import { ToDeliveryModule } from './to_delivery/to_delivery.module';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    UserModule,
    StaffModule,
    ScheduleModule,
    StoreModule,
    LipstickModule,
    UserModule,
    AuthModule,
    OrderModule,
    CartModule,
    RoleModule,
    ToDeliveryModule,
    SupplierModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
