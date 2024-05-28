import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

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
}
