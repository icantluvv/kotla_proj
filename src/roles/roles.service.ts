import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(dto: CreateRoleDto) {
    const existingRole = await this.roleRepository.findOneBy({
      role: dto.role,
    });

    if (existingRole)
      throw new BadRequestException('This role value already exists');

    const role = this.roleRepository.save({
      role: dto.role,
    });

    return role;
  }

  async getRoleById(id: number) {
    return this.roleRepository.findOne({
      where: {
        id: Number(id),
      },
    });
  }
  async getRoleByRole(role: string) {
    return await this.roleRepository.findOneBy({
      role: role,
    });
  }
}
