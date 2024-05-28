import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Cart } from './cart.entity';
import { LipstickEntity } from 'src/lipstick/entities/lipstick.entity';

@Entity('cartItems')
export class CartItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Quantity: number;

  @ManyToOne(() => LipstickEntity, (lipstick) => lipstick.cartItem)
  @JoinColumn()
  lipstick: LipstickEntity;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;
}
