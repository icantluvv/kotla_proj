import { OrderItems } from './orderItems.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Total_Amount: number;

  @CreateDateColumn()
  Purchase_Date: Date;

  @OneToOne(() => UserEntity, (user) => user.order)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => OrderItems, (orderItem) => orderItem.order)
  orderItems: OrderItems[];
}
