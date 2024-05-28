import {
  Post,
  Request,
  UseGuards,
  Body,
  Controller,
  Get,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guards';

@ApiTags('order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('post')
  async CreateOrder(@Body() dto: CreateOrderDto, @Request() req: any) {
    return await this.orderService.CreateOrder(req, dto);
  }

  @Get('getOrders')
  async getOrders(@Request() req: any) {
    return await this.orderService.getOrders(req);
  }
}
