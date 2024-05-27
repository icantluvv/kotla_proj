import { ApiHideProperty } from '@nestjs/swagger';
import { StaffEntity } from 'src/staff/entities/staff.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Schedule')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Start_Time: string;

  @Column()
  End_Time: string;

  @ApiHideProperty()
  @OneToMany(() => StaffEntity, (staff) => staff.schedule)
  staff: StaffEntity[];
}
