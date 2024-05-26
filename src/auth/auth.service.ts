import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto): Promise<any> {
    const user = await this.userService.create(registerDto);
    const responseRole = user.role;

    const payload1 = { email: user.email, role: user.role };
    if (user.role == null) {
      user.email == null;
      throw new BadRequestException(`Ошибка регистрации`);
    }
    return {
      token: this.jwtService.sign(payload1),
      role: responseRole,
    };
  }

  async validateUserByEmail(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      return new BadRequestException(`Пользователи не совпадают`);
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException(`Пароль не верен`);
    }
    const payload1 = { email: user.email, role: user.role };
    return {
      token: this.jwtService.sign(payload1),
    };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException(`Такого юзера не существует`);
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException(`Неправильно логин или пароль`);
    }
    const payload = { email: user.email, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validate(payload: { email: string /* role: string; id: number*/ }) {
    const user = await this.userService.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      email: user.email,
      // role: user.role,
      // id: user.id,
    };
  }
}
