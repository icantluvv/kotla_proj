import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

import { CreateLipstickDto } from './dto/create-lipstick.dto';
import { UpdateLipstickDto } from './dto/update-lipstick.dto';
import { LipstickEntity } from './entities/lipstick.entity';
import { BrandService } from 'src/brand/brand.service';
import { StoreService } from 'src/store/store.service';
// import { CategoryEntity } from 'src/category/entities/category.entity';

@Injectable()
export class LipstickService {
  constructor(
    @InjectRepository(LipstickEntity)
    private LipstickRepository: Repository<LipstickEntity>,
    private readonly brandService: BrandService,
    private readonly storeService: StoreService,
  ) {}

  async create(
    dto: CreateLipstickDto,
    image: Express.Multer.File,
  ): Promise<LipstickEntity> {
    const lipstick = new LipstickEntity();
    lipstick.image = image.filename;
    lipstick.Price = dto.Price;
    lipstick.Color = dto.Color;
    lipstick.Name = dto.Name;

    const brand = await this.brandService.findOne(dto.brandId);
    lipstick.brand = brand;

    const store = await this.storeService.findOne(dto.storeId);
    lipstick.store = store;

    const newLipstick = await this.LipstickRepository.save(lipstick);

    return newLipstick;
  }

  async update(
    id: number,
    dto: UpdateLipstickDto,
    image: Express.Multer.File,
  ): Promise<LipstickEntity> {
    const toUpdate = await this.LipstickRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.Color) toUpdate.Color = dto.Color;
    if (dto.Name) toUpdate.Name = dto.Name;
    if (dto.Price) toUpdate.Price = dto.Price;

    if (dto.brandId) {
      const brand = await this.brandService.findOne(dto.brandId);
      toUpdate.brand = brand;
    }

    if (dto.storeId) {
      const store = await this.storeService.findOne(dto.storeId);
      toUpdate.store = store;
    }

    if (image) {
      if (toUpdate.image !== image.filename) {
        fs.unlink(`db_images/cards/${toUpdate.image}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      toUpdate.image = image.filename;
    }

    return this.LipstickRepository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.LipstickRepository.delete(id);
  }

  async getProductById(id: number) {
    return await this.LipstickRepository.findOneBy({ id: id });
  }

  async findAll(): Promise<LipstickEntity[]> {
    return this.LipstickRepository.find();
  }

  async findOne(id: number): Promise<LipstickEntity> {
    return this.LipstickRepository.findOneBy({ id });
  }

  async findByBrandId(brandId: number): Promise<LipstickEntity[]> {
    return this.LipstickRepository.createQueryBuilder('lipstick')
      .leftJoinAndSelect('lipstick.brand', 'brand')
      .where('lipstick.brandId = :brandId', { brandId })
      .getMany();
  }
}
