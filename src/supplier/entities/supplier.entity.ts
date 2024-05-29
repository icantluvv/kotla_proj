import { ToDelivery } from 'src/to_delivery/entities/to_delivery.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  Phone: string;

  @Column()
  Adress: string;

  @Column()
  Country: string;

  @Column()
  Supplier_Name: string;

  @OneToMany(() => ToDelivery, (todelivery) => todelivery.supplier)
  todelivery: ToDelivery[];
}
