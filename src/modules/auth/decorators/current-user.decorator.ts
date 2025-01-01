import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('Current User:', user);
    return data ? user?.[data] : user;
  },
);
