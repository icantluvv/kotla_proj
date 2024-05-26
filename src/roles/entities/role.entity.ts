import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  // JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  user: UserEntity[];
}
