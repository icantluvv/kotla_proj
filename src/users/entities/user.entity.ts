import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Cart } from 'src/cart/entities/cart.entity';

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
}
