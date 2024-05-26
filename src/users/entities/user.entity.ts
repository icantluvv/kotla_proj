import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Role } from 'src/roles/entities/role.entity';

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

  @OneToOne(() => Order, (order) => order.user)
  order: Order;
}
