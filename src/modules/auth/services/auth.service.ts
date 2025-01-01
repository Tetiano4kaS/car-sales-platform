import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AccountTypeEntity } from '../../../database/entities/account-type.entity';
import { AccountType } from '../../../database/entities/enums/account-type.enum';
import { RoleEntity } from '../../../database/entities/roles.entity';
import { AccountRepository } from '../../repository/services/account.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { RolesRepository } from '../../repository/services/roles.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { SignInReqDto } from '../models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
import { UserRole } from '../models/enums/roles.enum';
import { IUserData } from '../models/interfaces/user-data.interface';
import { AuthCacheService } from './auth-cache-service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly roleRepository: RolesRepository,
    private readonly accountTypeRepository: AccountRepository,
  ) {}

  public async signUp(
    dto: SignUpReqDto,
    creatorRole: UserRole,
  ): Promise<AuthResDto> {
    await this.isEmailNotExistOrThrow(dto.email);
    const password = await bcrypt.hash(dto.password, 10);

    let userRole: RoleEntity;

    if (!dto.role || dto.role === UserRole.BUYER) {
      userRole = await this.getRoleOrThrow(UserRole.BUYER);
    } else if (dto.role === UserRole.SELLER) {
      userRole = await this.getRoleOrThrow(UserRole.SELLER);
    } else if (dto.role === UserRole.MANAGER) {
      if (creatorRole !== UserRole.ADMIN) {
        throw new UnauthorizedException('Only admins can create managers');
      }
      userRole = await this.getRoleOrThrow(UserRole.MANAGER);
    } else if (dto.role === UserRole.ADMIN) {
      throw new UnauthorizedException(
        'Admins cannot be created via registration',
      );
    } else {
      throw new Error('Invalid role');
    }
    const basicAccountType = await this.getBasicAccount();

    const user = await this.userRepository.save(
      this.userRepository.create({
        ...dto,
        password,
        roles: [userRole],
        accountType: basicAccountType,
      }),
    );

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      roles: [userRole.name],
    });
    await Promise.all([
      this.authCacheService.saveToken(tokens.accessToken, user.id),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,

          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);

    return { user, tokens, roles: [userRole.name] };
  }

  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      relations: ['roles'],
      select: ['id', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const userRoles = user.roles.map((role) => role.name);

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      roles: userRoles,
    });
    await Promise.all([
      this.authCacheService.saveToken(tokens.accessToken, user.id),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
    const userEntity = await this.userRepository.findOneBy({ id: user.id });

    return { user: userEntity, tokens, roles: userRoles };
  }

  public async signOut(userData: IUserData): Promise<void> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
      }),
    ]);
  }

  public async refresh(userData: IUserData): Promise<TokenPairResDto> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
      }),
    ]);

    const tokens = await this.tokenService.generateAuthTokens({
      userId: userData.userId,
      roles: userData.roles,
    });
    await Promise.all([
      this.authCacheService.saveToken(tokens.accessToken, userData.userId),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: userData.userId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);

    return tokens;
  }
  private async getRoleOrThrow(roleName: string): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne({
      where: { name: roleName },
    });
    if (!role) {
      throw new Error(`Role "${roleName}" not found`);
    }
    return role;
  }
  private async isEmailNotExistOrThrow(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new Error('Email already exists');
    }
  }
  private async getBasicAccount(): Promise<AccountTypeEntity> {
    const accountType = await this.accountTypeRepository.findOne({
      where: { name: AccountType.BASIC },
    });
    if (!accountType) {
      throw new Error('Basic account type not found');
    }
    return accountType;
  }
}
