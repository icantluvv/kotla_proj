import { ApiHideProperty } from '@nestjs/swagger';
import { LipstickEntity } from 'src/lipstick/entities/lipstick.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('brand')
export class BrandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Brand_Name: string;

  @Column()
  Brand_Code: number;

  @ApiHideProperty()
  @OneToMany(() => LipstickEntity, (lipstick) => lipstick.brand)
  lipstick: LipstickEntity[];
}
