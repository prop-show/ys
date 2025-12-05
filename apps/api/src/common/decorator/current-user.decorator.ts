import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { UserSelect } from '@ys/shared';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContextHost): UserSelect => {
    const request = ctx.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return request?.user;
  },
);
