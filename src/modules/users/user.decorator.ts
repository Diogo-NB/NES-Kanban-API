import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/users/user.interface';

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<
      Request & {
        user: User;
      }
    >();
    return request.user;
  },
);
