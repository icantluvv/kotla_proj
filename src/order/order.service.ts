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
    order.Total_Amount = 0;
    await this.orderRepository.save(order);
    return order;
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
      throw new NotFoundException(`Cart not found ${user.id}`);
    }

    let sum = 0;
    userOrder.orderItems.forEach((a) => (sum += a.lipstick.Price * a.Quantity));

    const AddOrderItem = this.orderItemsRepository.create({
      Quantity: dto.Quantity,
      lipstick: lipstick,
      order: userOrder,
    });

    const ToOrder = await this.orderRepository.findOne({
      relations: {
        user: {
          order: true,
        },
      },
      where: {
        user: user.id,
      },
    });

    ToOrder.Total_Amount = sum;
    await this.orderRepository.save(ToOrder);

    return await this.orderItemsRepository.save(AddOrderItem);
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
      .where('orderId = :orderId', { orderId: userOrder.id })
      .execute();

    userOrder.Total_Amount = 0;

    return await this.orderRepository.save(userOrder);
  }

  async deleteOne(id: number, user: any) {
    const userOrder = await this.orderRepository.findOne({
      relations: ['orderItems', 'orderItems.lipstick'],
      where: {
        user: user,
      },
    });

    if (!userOrder) {
      throw new NotFoundException(`Cart not found for user`);
    }

    const orderItem = userOrder.orderItems.find((item) => item.id === id);

    if (!orderItem) {
      throw new NotFoundException(`Product not found in cart`);
    }

    await this.orderItemsRepository.delete(orderItem.id);

    userOrder.Total_Amount -= orderItem.lipstick.Price * orderItem.Quantity;
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
