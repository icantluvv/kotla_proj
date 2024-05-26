import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { InjectRepository } from '@nestjs/typeorm';
import { config } from 'dotenv';
import * as dotenv from 'dotenv';
import { RoleService } from 'src/roles/roles.service';
config();

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly orderService: OrderService,
    private readonly roleService: RoleService,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException(
        `Пользователь с email: ${dto.email} уже существует`,
      );
    }
    dotenv.config();

    const user = await this.repository.save({
      email: dto.email,
      password: dto.password,
      Nickname: dto.Nickname,
      Phone: dto.Phone,
    });
    const order = await this.orderService.createOrder(user);
    user.order = order;

    // const role = await this.roleService.getRoleByRole('user');
    const role = await this.roleService.getRoleByRole('user');

    user.role = role;
    await this.repository.save(user);

    return user;
  }

  async findOne(id: number): Promise<UserEntity> {
    try {
      const user = await this.repository.findOneBy({ id });
      return user;
    } catch {
      throw new BadRequestException(`no one`);
    }
  }

  async findAll() {
    return this.repository.find();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.findOne({
      relations: {
        role: true,
      },
      where: {
        email: email,
      },
    });

    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    try {
      const user = await this.repository.findOneBy({ id });
      return await this.repository.update(user.id, dto);
    } catch {
      throw new BadRequestException(`no one`);
    }
  }

  async delete(id: number) {
    try {
      const user = await this.repository.findOneBy({ id });
      return await this.repository.delete(user.id);
    } catch {
      throw new BadRequestException(`netu`);
    }
  }
}
