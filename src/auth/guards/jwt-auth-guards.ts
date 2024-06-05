import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // canActivate(context: ExecutionContext) {
  //   return super.canActivate(context);
  // }

  constructor(private readonly authService: AuthService) {
    super();
  }

  // handleRequest(err, user) {
  //   if (err || !user) {
  //     throw err || new UnauthorizedException();
  //   }
  //   return user; // Возвращаем объект user, включающий email
  // }
}
