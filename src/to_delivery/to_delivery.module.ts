import { Module } from '@nestjs/common';
import { ToDeliveryService } from './to_delivery.service';
import { ToDeliveryController } from './to_delivery.controller';
import { OrderModule } from 'src/order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDelivery } from './entities/to_delivery.entity';
import { ConfigModule } from '@nestjs/config';
import { SupplierModule } from 'src/supplier/supplier.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ToDelivery]),
    OrderModule,
    SupplierModule,
    ConfigModule,
    JwtModule,
  ],
  controllers: [ToDeliveryController],
  providers: [ToDeliveryService],
  exports: [ToDeliveryService],
})
export class ToDeliveryModule {}
