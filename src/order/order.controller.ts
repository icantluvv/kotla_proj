import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@ApiTags('order')
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post('addProductToOrder')
  async addProductToOrder(@Body() dto: CreateOrderDto, @Request() req: any) {
    return this.orderService.addProductToOrder(dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUserOrderTotalPrice')
  getUserOrderTotalPrice(@Request() req: any) {
    return this.orderService.getUserOrderTotalPrice(req.user.id);
  }
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.orderService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findUserOrder(@Request() req: any) {
    return this.orderService.findOneByUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  delete(@Request() req: any) {
    return this.orderService.delete(req.user);
  }
}
