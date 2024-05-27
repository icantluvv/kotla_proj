import { ApiHideProperty } from '@nestjs/swagger';
import { LipstickEntity } from 'src/lipstick/entities/lipstick.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('store')
export class StoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column()
  Email: string;

  @Column()
  Adress: string;

  @ApiHideProperty()
  @OneToMany(() => LipstickEntity, (lipstick) => lipstick.store)
  lipstick: LipstickEntity[];
}
