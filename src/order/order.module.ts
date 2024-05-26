import { Module } from '@nestjs/common';
import { OrderService } from './order.service';

import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItems } from './entities/orderItems.entity';
import { LipstickModule } from 'src/lipstick/lipstick.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItems]),
    LipstickModule,
    JwtModule,
    ConfigModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
