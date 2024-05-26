import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalStrategy } from './strategies/local-strategy';

@ApiTags('REG AND AUTH')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly localStrategy: LocalStrategy) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    return await this.localStrategy.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.localStrategy.login(loginDto);
    if (!user) {
      throw new UnauthorizedException('Неправильные учетные данные');
    }
    return user;
  }
}
