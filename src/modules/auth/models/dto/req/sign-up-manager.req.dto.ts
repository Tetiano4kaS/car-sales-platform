import { OmitType } from '@nestjs/swagger';

import { BaseAuthReqDto } from './base-auth.req.dto';

export class SignUpManagerReqDto extends OmitType(BaseAuthReqDto, ['role']) {}
