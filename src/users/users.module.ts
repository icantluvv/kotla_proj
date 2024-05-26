import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { OrderModule } from 'src/order/order.module';
import { RoleModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), OrderModule, RoleModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
