import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from '../../../../user/models/dto/req/base-user.req.dto';

export class BaseAuthReqDto extends PickType(BaseUserReqDto, [
  'email',
  'password',
  'name',
  'role',
]) {}
