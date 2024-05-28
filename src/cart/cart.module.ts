import { Module } from '@nestjs/common';
import { CartService } from './cart.service';

import { OrderController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItems } from './entities/cartitems.entity';
import { LipstickModule } from 'src/lipstick/lipstick.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItems]),
    LipstickModule,
    JwtModule,
    ConfigModule,
  ],
  controllers: [OrderController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
