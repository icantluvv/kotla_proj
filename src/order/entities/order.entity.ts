import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { ToDelivery } from 'src/to_delivery/entities/to_delivery.entity';
import { OrderItems } from './orderItems.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Total_Amount: number;

  @ManyToOne(() => UserEntity, (user) => user.order)
  @JoinColumn()
  user: UserEntity;

  @OneToOne(() => ToDelivery, (todelivery) => todelivery.order)
  todelivery: ToDelivery;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.order)
  orderItems: OrderItems;
}
