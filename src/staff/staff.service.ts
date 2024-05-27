import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffEntity } from './entities/staff.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleService } from 'src/schedule/schedule.service';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffEntity)
    private repository: Repository<StaffEntity>,
    private storeService: StoreService,
    private scheduleService: ScheduleService,
  ) {}

  async create(dto: CreateStaffDto): Promise<StaffEntity> {
    const existingAdmin = await this.findByEmail(dto.email);

    if (existingAdmin) {
      throw new BadRequestException(
        `Пользователь с email: ${dto.email} уже существует`,
      );
    }
    const staff = new StaffEntity();
    staff.First_Name = dto.First_Name;
    staff.Last_Name = dto.Last_Name;
    staff.Phone = dto.Phone;
    staff.email = dto.email;
    staff.password = dto.password;

    const store = await this.storeService.findOne(dto.storeId);
    staff.store = store;

    const schedule = await this.scheduleService.findOne(dto.scheduleId);
    staff.schedule = schedule;

    const newLipstick = await this.repository.save(staff);

    return newLipstick;
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateStaffDto) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись с id=${id} не найдена`);
    }
    if (dto.First_Name) toUpdate.First_Name = dto.First_Name;
    if (dto.Last_Name) toUpdate.Last_Name = dto.Last_Name;
    if (dto.Phone) toUpdate.Phone = dto.Phone;
    if (dto.password) toUpdate.password = dto.password;
    if (dto.email) toUpdate.email = dto.email;

    if (dto.scheduleId) {
      const schedule = await this.scheduleService.findOne(dto.scheduleId);
      toUpdate.schedule = schedule;
    }

    if (dto.storeId) {
      const store = await this.storeService.findOne(dto.storeId);
      toUpdate.store = store;
    }
    return this.repository.save(toUpdate);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }

  async findByEmail(email: string): Promise<StaffEntity> {
    const user = await this.repository.findOne({
      relations: {
        store: true,
      },
      where: {
        email: email,
      },
    });

    return user;
  }
}
