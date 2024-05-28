import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CartModule } from 'src/cart/cart.module';
import { RoleModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CartModule, RoleModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
