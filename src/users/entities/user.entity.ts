import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { OrderEntity } from 'src/order/entities/order.entity';

@Entity('Client')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  Nickname: string;

  @Column()
  Phone: string;

  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => OrderEntity, (order) => order.user)
  order: OrderEntity;
}
