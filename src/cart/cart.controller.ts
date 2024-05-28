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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@ApiTags('cart')
@ApiBearerAuth()
@Controller('cart')
export class OrderController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('addProductToOrder')
  async addProductToOrder(@Body() dto: CreateCartDto, @Request() req: any) {
    return this.cartService.addProductToOrder(dto, req.user);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.cartService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findUserOrder(@Request() req: any) {
    return this.cartService.findOneByUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('all')
  delete(@Request() req: any) {
    return this.cartService.delete(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string, @Request() req: any) {
    return this.cartService.deleteOne(+id, req.user);
  }
}
