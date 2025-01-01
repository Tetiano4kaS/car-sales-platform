import { UserResDto } from '../../../../user/models/dto/res/user.res.dto';
import { TokenPairResDto } from './token-pair.res.dto';

export class AuthManagerResDto {
  tokens: TokenPairResDto;
  user: UserResDto;
}
