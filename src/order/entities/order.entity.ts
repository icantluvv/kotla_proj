import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { ToDelivery } from 'src/to_delivery/entities/to_delivery.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  First_Name: string;

  @Column()
  Second_Name: string;

  @Column()
  email: string;

  @Column()
  Phone: string;

  @ManyToOne(() => UserEntity, (user) => user.order)
  @JoinColumn()
  user: UserEntity;

  @OneToOne(() => ToDelivery, (todelivery) => todelivery.order)
  todelivery: ToDelivery;
}
