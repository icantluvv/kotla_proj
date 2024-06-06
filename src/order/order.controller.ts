import { Post, Request, UseGuards, Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
// import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guards';

@ApiTags('order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post('post')
  async CreateOrder(@Request() req: any) {
    return await this.orderService.CreateOrder(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getOrders')
  async getOrders(@Request() req: any) {
    return await this.orderService.getOrders(req);
  }
}
