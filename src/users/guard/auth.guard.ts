import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);

    const req: any = ctx.getContext().req;

    const cookie = req.headers.cookie;

    if (cookie.includes('jwt=') && cookie.length === 143) {
      return true;
    }

    return false;
  }
}
