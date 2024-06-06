import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
// import { CreateOrderDto } from './dto/create-order.dto';
import { UsersService } from 'src/users/users.service';
import { CartService } from 'src/cart/cart.service';
import { OrderItems } from './entities/orderItems.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItems)
    private orderItems: Repository<OrderItems>,
    private readonly cartService: CartService,
    private readonly userService: UsersService,
  ) {}

  async CreateOrder(req: any) {
    const userBasket = await this.cartService.getUserBasket(req.user);

    if (userBasket.cartItems.length == 0) {
      throw new BadRequestException(
        'You cannot create an order with an empty cart',
      );
    } // Проверка корзины на пустоту

    const user = await this.userService.findOne(req.user.id); // Находим юзера

    if (!user) {
      throw new BadRequestException('User not found');
    } // проверка на юзера

    const orderEntity = new OrderEntity(); // Создаем новый заказ
    Object.assign(orderEntity); // засовывваем в объект энтити

    orderEntity.user = user; // засовываем юзера в поле юзер заказа

    orderEntity.Total_Amount = userBasket.Total_Amount; // засовываем тотал в заказ

    await this.orderRepository.save(orderEntity); // сохраняем ордер

    for (const cartItem of userBasket.cartItems) {
      const orderItem = new OrderItems();
      orderItem.order = orderEntity;
      orderItem.lipstick = cartItem.lipstick;
      await this.orderItems.save(orderItem);
    } // собираем ордер итем

    await this.cartService.delete(req.user); // очищаем корзину
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
