import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { SignUpManagerReqDto } from '../models/dto/req/sign-up-manager.req.dto';
import { UserRole } from '../models/enums/roles.enum';

export class UserMapper {
  public static toSignUpReqDto(user: SignUpManagerReqDto): SignUpReqDto {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      role: UserRole.MANAGER,
    };
  }
}
