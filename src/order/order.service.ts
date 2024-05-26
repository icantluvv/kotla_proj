import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { LipstickService } from 'src/lipstick/lipstick.service';
import { OrderItems } from './entities/orderItems.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItems)
    private readonly orderItemsRepository: Repository<OrderItems>,
    private readonly lipstickService: LipstickService,
  ) {}

  async createOrder(user: UserEntity): Promise<Order> {
    const order = new Order();
    order.user = user;
    await this.orderRepository.save(order);
    return order;
  }

  async getUserOrderTotalPrice(userId: number) {
    const order = await this.orderRepository.findOne({
      where: { user: { id: userId } },
      relations: {
        orderItems: {
          lipstick: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Cart not found for user with ID: ' + userId);
    }
    if (order.orderItems == null) {
      return 0;
    }
    // let sum = 0
    // cart.cartItems.forEach(
    //     (a) => (sum += a.room.prices[a.choose] * a.Quantity),
    // )
    // return sum
  }

  async addProductToOrder(dto: CreateOrderDto, user: any) {
    const lipstick = await this.lipstickService.getProductById(dto.lipstickId);
    if (!lipstick) {
      throw new BadRequestException(`Такого товара нет`);
    }

    const userOrder = await this.orderRepository.findOne({
      relations: {
        orderItems: {
          lipstick: true,
        },
      },
      where: {
        user: user,
      },
    });

    if (!userOrder) {
      // Создаем новую корзину, если ее не существует
      throw new NotFoundException(`Cart not found ${user.id}`);
    }
    if (userOrder.orderItems.length != 0) {
      throw new BadRequestException(`Корзина заполнена`);
    }
    // const quantity = Math.ceil(
    //     (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    // )
    // const sum = product.prices[dto.choose] * quantity

    // const cartItem = this.cartItemRepository.create({
    //     room: product,
    //     Quantity: quantity,
    //     choose: dto.choose,
    //     cart: userCart,
    //     price: sum,
    // })

    // return await this.cartItemRepository.save(cartItem)
  }

  async findOneByUser(user: any) {
    const userOrder = await this.orderRepository.findOne({
      relations: {
        orderItems: {
          lipstick: true,
        },
      },
      where: {
        user: user,
      },
    });
    return userOrder;
  }

  async findOne(lipstickId: number, user: any) {
    const userOrder = await this.orderRepository.findOne({
      relations: {
        orderItems: {
          lipstick: true,
        },
      },
      where: {
        user: user,
      },
    });

    const lipstick = userOrder.orderItems;

    if (!lipstick) {
      throw new NotFoundException(
        'Cart does not have product ID: ' + lipstickId,
      );
    }

    return lipstick;
  }

  async delete(user: any) {
    const userOrder = await this.orderRepository.findOne({
      relations: {
        orderItems: {
          lipstick: true,
        },
      },
      where: {
        user: user,
      },
    });

    if (!userOrder) {
      throw new NotFoundException(`Cart not found for user`);
    }
    await this.orderItemsRepository
      .createQueryBuilder()
      .delete()
      .where('oderId = :orderId', { orderId: userOrder.id })
      .execute();

    return await this.orderRepository.save(userOrder);
  }

  async getUserBasket(user: any) {
    const userOrder = await this.orderRepository.findOne({
      relations: {
        orderItems: {
          lipstick: true,
        },
      },
      where: {
        user: user,
      },
    });
    return userOrder;
  }
}
