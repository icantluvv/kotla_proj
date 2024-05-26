import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from './order.entity';
import { LipstickEntity } from 'src/lipstick/entities/lipstick.entity';

@Entity('orderItems')
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Quantity: number;

  @ManyToOne(() => LipstickEntity, (lipstick) => lipstick.orderItem)
  @JoinColumn()
  lipstick: LipstickEntity;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;
}
