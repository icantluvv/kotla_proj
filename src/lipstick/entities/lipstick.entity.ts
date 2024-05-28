import { BrandEntity } from 'src/brand/entities/brand.entity';
import { CartItems } from 'src/cart/entities/cartitems.entity';
import { StoreEntity } from 'src/store/entities/store.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => CartItems, (cartItem) => cartItem.lipstick)
  cartItem: CartItems[];

  @ManyToOne(() => BrandEntity, (brand) => brand.lipstick, {
    eager: true,
  })
  @JoinColumn()
  brand: BrandEntity;

  @ManyToOne(() => StoreEntity, (store) => store.lipstick, {
    eager: true,
  })
  @JoinColumn()
  store: StoreEntity;
}
