import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { OrderEntity } from './order.entity';
import { LipstickEntity } from 'src/lipstick/entities/lipstick.entity';

@Entity('OrderItems')
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LipstickEntity, (lipstick) => lipstick.orderItem)
  @JoinColumn()
  lipstick: LipstickEntity;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  order: OrderEntity;
}
