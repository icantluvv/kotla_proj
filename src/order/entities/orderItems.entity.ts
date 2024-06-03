import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { OrderEntity } from './order.entity';

@Entity('OrderItems')
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  order: OrderEntity;
}
