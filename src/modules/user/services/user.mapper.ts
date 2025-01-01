import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload.interface';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { UserResDto } from '../models/dto/res/user.res.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  public static toIUserData(
    user: UserEntity,
    jwtPayload: IJwtPayload,
  ): IUserData {
    return {
      userId: user.id,
      email: user.email,
      roles: jwtPayload.roles || [],
    };
  }
}
