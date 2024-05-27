import { ScheduleEntity } from 'src/schedule/entities/schedule.entity';
import { StoreEntity } from 'src/store/entities/store.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('Administrator')
export class StaffEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  Phone: string;

  @Column()
  First_Name: string;

  @Column()
  Last_Name: string;

  @ManyToOne(() => ScheduleEntity, (schedule) => schedule.staff)
  schedule: ScheduleEntity;

  @ManyToOne(() => StoreEntity, (store) => store.staff)
  store: StoreEntity;
}
