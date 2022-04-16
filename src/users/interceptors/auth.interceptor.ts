import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class SaveCurrentUser implements NestInterceptor {
  constructor(
    private usersService: UsersService,
    private JwtService: JwtService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);

    const req: any = ctx.getContext().req;

    const cookie: string = req.headers.cookie;

    if (!cookie) {
      next.handle();
    }
    const parsedCookie = cookie.replace('jwt=', '');

    const decodedToken: any = await this.JwtService.decode(parsedCookie);

    const user = await this.usersService.findOne(decodedToken.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    req.user = user;

    return next.handle();
  }
}
