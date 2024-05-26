import { OrderItems } from 'src/order/entities/orderItems.entity';
// import { CategoryEntity } from 'src/category/entities/category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lipstick')
export class LipstickEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  Price: number;

  @Column()
  Color: string;

  @Column()
  Name: string;

  @OneToMany(() => OrderItems, (orderItem) => orderItem.lipstick)
  orderItem: OrderItems[];

  // @ManyToOne(() => CategoryEntity, (category) => category.room, {
  //   eager: true,
  // })
  // @JoinColumn()
  // category: CategoryEntity;
}
