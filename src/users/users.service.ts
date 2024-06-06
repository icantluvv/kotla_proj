import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { InjectRepository } from '@nestjs/typeorm';
import { config } from 'dotenv';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { RoleService } from 'src/roles/roles.service';
config();

@Injectable()
export class UsersService {
  private readonly hashSaltRounds: number;
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly cartService: CartService,
    private readonly roleService: RoleService,
  ) {
    this.hashSaltRounds = parseInt(process.env.HASH_SALT_ROUNDS);
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException(
        `Пользователь с email: ${dto.email} уже существует`,
      );
    }
    dotenv.config();

    const hashedPassword = await bcrypt.hash(dto.password, this.hashSaltRounds);

    const user = await this.repository.save({
      email: dto.email,
      // password: dto.password,
      password: hashedPassword,
      Nickname: dto.Nickname,
      Phone: dto.Phone,
    });

    user.password = hashedPassword;

    const cart = await this.cartService.createCart(user);
    user.cart = cart;

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

    if (!user) {
      console.log(`no one`);
    }

    return user;
  }
}
