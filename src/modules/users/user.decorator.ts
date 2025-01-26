import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/users/user.inteface';

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<
      Request & {
        user: User;
      }
    >();
    const user: User = {
      id: request.user.id,
      username: request.user.username,
    };
    return user;
  },
);
