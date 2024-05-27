import { ApiHideProperty } from '@nestjs/swagger';
import { LipstickEntity } from 'src/lipstick/entities/lipstick.entity';
import { StaffEntity } from 'src/staff/entities/staff.entity';
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

  @ApiHideProperty()
  @OneToMany(() => StaffEntity, (staff) => staff.store)
  staff: StaffEntity[];
}
