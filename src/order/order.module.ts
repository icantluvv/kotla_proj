import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserModule } from 'src/users/users.module';
import { OrderEntity } from './entities/order.entity';
import { CartModule } from 'src/cart/cart.module';
import { LipstickModule } from 'src/lipstick/lipstick.module';
import { OrderItems } from './entities/orderItems.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItems]),
    UserModule,
    CartModule,
    LipstickModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
