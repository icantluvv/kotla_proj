import { Controller } from '@nestjs/common';
import { RoleService } from './roles.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ROLES')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RoleService) {}

  // @Post()
  // create(@Body() createRoleDto: CreateRoleDto) {
  //   return this.rolesService.create(createRoleDto);
  // }
}
