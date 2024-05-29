import { CreateToDeliveryDto } from './dto/create-to_delivery.dto';
import { UpdateToDeliveryDto } from './dto/update-to_delivery.dto';
import { ToDelivery } from './entities/to_delivery.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierService } from 'src/supplier/supplier.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class ToDeliveryService {
  constructor(
    @InjectRepository(ToDelivery)
    private repository: Repository<ToDelivery>,
    private supplierService: SupplierService,
    private orderService: OrderService,
  ) {}

  async create(dto: CreateToDeliveryDto): Promise<ToDelivery> {
    const existingDelivery = await this.findOne(dto.orderId);

    if (existingDelivery) {
      throw new BadRequestException(
        `Доставка для заказа номер: ${dto.orderId} уже существует`,
      );
    }
    const todelivery = new ToDelivery();

    todelivery.status = dto.status;

    const supplier = await this.supplierService.findOne(dto.supplierId);
    todelivery.supplier = supplier;

    const order = await this.orderService.findOne(dto.orderId);
    todelivery.order = order;

    const newDelivery = await this.repository.save(todelivery);

    return newDelivery;
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateToDeliveryDto) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись с id=${id} не найдена`);
    }

    if (dto.status) toUpdate.status = dto.status;

    if (dto.orderId) {
      const order = await this.orderService.findOne(dto.orderId);
      toUpdate.order = order;
    }

    if (dto.supplierId) {
      const supplier = await this.supplierService.findOne(dto.supplierId);
      toUpdate.supplier = supplier;
    }
    return this.repository.save(toUpdate);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
