import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoreEntity } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private repository: Repository<StoreEntity>,
  ) {}

  async create(dto: CreateStoreDto) {
    return this.repository.save(dto);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateStoreDto) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись с id=${id} не найдена`);
    }
    if (dto.Name) {
      toUpdate.Name = dto.Name;
      toUpdate.Adress = dto.Adress;
      toUpdate.Email = dto.Email;
    }
    return this.repository.save(toUpdate);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
