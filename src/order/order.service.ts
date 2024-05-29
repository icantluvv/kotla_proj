import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UsersService } from 'src/users/users.service';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private readonly cartService: CartService,
    private readonly userService: UsersService,
  ) {}

  async CreateOrder(req: any, dto: CreateOrderDto) {
    const userBasket = await this.cartService.getUserBasket(req.user);

    if (userBasket.cartItems.length == 0) {
      throw new BadRequestException(
        'You cannot create an order with an empty cart',
      );
    }

    const user = await this.userService.findOne(req.user.id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const orderEntity = new OrderEntity();
    Object.assign(orderEntity, dto);

    orderEntity.user = user;

    await this.orderRepository.save(orderEntity);
    await this.cartService.delete(req.user);
    return orderEntity;
  }
  async getOrders(req: any) {
    const userOrder = await this.orderRepository.find({
      where: {
        user: req.user,
      },
    });
    return userOrder;
  }

  async findOne(id: number) {
    return this.orderRepository.findOneBy({ id });
  }
}
