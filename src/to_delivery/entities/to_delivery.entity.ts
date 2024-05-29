import { OrderEntity } from 'src/order/entities/order.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ToDelivery')
export class ToDelivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @OneToOne(() => OrderEntity, (order) => order.todelivery)
  @JoinColumn()
  order: OrderEntity;

  @ManyToOne(() => Supplier, (supplier) => supplier.todelivery)
  @JoinColumn()
  supplier: Supplier;
}
