import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ToDeliveryService } from './to_delivery.service';
import { CreateToDeliveryDto } from './dto/create-to_delivery.dto';
import { UpdateToDeliveryDto } from './dto/update-to_delivery.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@ApiTags('ToDelivery')
@Controller('ToDelivery')
@ApiBearerAuth()
export class ToDeliveryController {
  constructor(private readonly toDeliveryService: ToDeliveryService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createToDeliveryDto: CreateToDeliveryDto) {
    return this.toDeliveryService.create(createToDeliveryDto);
  }
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.toDeliveryService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toDeliveryService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateToDeliveryDto: UpdateToDeliveryDto,
  ) {
    return this.toDeliveryService.update(+id, updateToDeliveryDto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDeliveryService.delete(+id);
  }
}
