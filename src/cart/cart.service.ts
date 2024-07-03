import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { LipstickService } from 'src/lipstick/lipstick.service';
import { CartItems } from './entities/cartitems.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItems)
    private readonly cartItemsRepository: Repository<CartItems>,
    private readonly lipstickService: LipstickService,
  ) {}

  async createCart(user: UserEntity): Promise<Cart> {
    const cart = new Cart();
    cart.user = user;
    cart.Total_Amount = 0;
    await this.cartRepository.save(cart);
    return cart;
  }

  async deleteOne(id: number, user: any) {
    const userCart = await this.cartRepository.findOne({
      relations: ['cartItems', 'cartItems.lipstick'],
      where: {
        user: user,
      },
    });

    if (!userCart) {
      throw new NotFoundException(`Cart not found for user`);
    }

    const cartItem = userCart.cartItems.find((item) => item.id === id);

    if (!cartItem) {
      throw new NotFoundException(`Product not found in cart`);
    }
    userCart.Total_Amount -= cartItem.lipstick.Price * cartItem.Quantity;

    // Удаляем элемент корзины
    await this.cartItemsRepository.delete(cartItem.id);

    // Сохраняем обновленную корзину
    // await this.cartRepository.save(userCart);

    return await this.cartRepository.save(userCart);
  }

  async addProductToOrder(dto: CreateCartDto, user: any) {
    const lipstick = await this.lipstickService.getProductById(dto.lipstickId);
    if (!lipstick) {
      throw new BadRequestException(`Такого товара нет`);
    }

    const userCart = await this.cartRepository.findOne({
      relations: {
        cartItems: {
          lipstick: true,
        },
      },
      where: {
        user: user,
      },
    });

    if (!userCart) {
      throw new NotFoundException(`Cart not found ${user.id}`);
    }

    const itemPrice = lipstick.Price * dto.Quantity;
    userCart.Total_Amount += itemPrice;

    await this.cartRepository.save(userCart);

    const AddOrderItem = this.cartItemsRepository.create({
      Quantity: dto.Quantity,
      lipstick: lipstick,
      cart: userCart,
    });
    await this.cartItemsRepository.save(AddOrderItem);

    const ToCart = await this.cartRepository.findOne({
      relations: {
        user: {
          cart: true,
        },
      },
      where: {
        user: user.id,
      },
    });

    await this.cartRepository.save(ToCart);

    return AddOrderItem;
  }

  async getTotalAmount() {}

  async findOneByUser(user: any) {
    const userOrder = await this.cartRepository.findOne({
      relations: {
        cartItems: {
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
    const userOrder = await this.cartRepository.findOne({
      relations: {
        cartItems: {
          lipstick: true,
        },
      },
      where: {
        user: user,
      },
    });

    const lipstick = userOrder.cartItems;

    if (!lipstick) {
      throw new NotFoundException(
        'Cart does not have product ID: ' + lipstickId,
      );
    }

    return lipstick;
  }

  async delete(user: any) {
    const userCart = await this.cartRepository.findOne({
      relations: {
        cartItems: {
          lipstick: true,
        },
      },
      where: {
        user: user,
      },
    });

    if (!userCart) {
      throw new NotFoundException(`Cart not found for user`);
    }

    await this.cartItemsRepository
      .createQueryBuilder()
      .delete()
      .where('cartId = :cartId', { cartId: userCart.id })
      .execute();

    userCart.Total_Amount = 0;

    return await this.cartRepository.save(userCart);
  }

  async getUserBasket(user: any) {
    const userCart = await this.cartRepository.findOne({
      relations: {
        cartItems: {
          lipstick: true,
        },
      },
      where: {
        user: user,
      },
    });
    let sum = 0;
    userCart.cartItems.forEach((a) => (sum += a.lipstick.Price * a.Quantity));
    userCart.Total_Amount = sum;
    return userCart;
  }
}
