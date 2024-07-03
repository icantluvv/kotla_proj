import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private repository: Repository<Supplier>,
  ) {}

  async create(dto: CreateSupplierDto): Promise<Supplier> {
    const existingSupplier = await this.findByEmail(dto.email);

    if (existingSupplier) {
      throw new BadRequestException(
        `Пользователь с email: ${dto.email} уже существует`,
      );
    }
    const supplier = new Supplier();
    supplier.Adress = dto.Adress;
    supplier.Country = dto.Country;
    supplier.Phone = dto.Phone;
    supplier.email = dto.email;
    supplier.Supplier_Name = dto.Supplier_Name;

    console.log(supplier);

    const newLipstick = await this.repository.save(supplier);
    return newLipstick;
  }

  async update(id: number, dto: UpdateSupplierDto) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись с id=${id} не найдена`);
    }
    if (dto.Adress) toUpdate.Adress = dto.Adress;
    if (dto.Country) toUpdate.Country = dto.Country;
    if (dto.Phone) toUpdate.Phone = dto.Phone;
    if (dto.Supplier_Name) toUpdate.Supplier_Name = dto.Supplier_Name;
    if (dto.email) toUpdate.email = dto.email;

    return this.repository.save(toUpdate);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }

  async findByEmail(email: string): Promise<Supplier> {
    const user = await this.repository.findOne({
      relations: {
        todelivery: true,
      },
      where: {
        email: email,
      },
    });

    return user;
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOneBy({ id });
  }
}
