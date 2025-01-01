import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RolesGuard } from './guards/roles.guard';
import { SignInReqDto } from './models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from './models/dto/req/sign-up.req.dto';
import { SignUpManagerReqDto } from './models/dto/req/sign-up-manager.req.dto';
import { AuthManagerResDto } from './models/dto/res/auth.manager.res.dto';
import { AuthResDto } from './models/dto/res/auth.res.dto';
import { TokenPairResDto } from './models/dto/res/token-pair.res.dto';
import { UserRole } from './models/enums/roles.enum';
import { IUserData } from './models/interfaces/user-data.interface';
import { AuthService } from './services/auth.service';
import { UserMapper } from './services/user.mapper';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('sign-up')
  public async signUp(@Body() dto: SignUpReqDto): Promise<AuthResDto> {
    const creatorRole: UserRole =
      dto.role && Object.values(UserRole).includes(dto.role)
        ? dto.role
        : UserRole.BUYER;
    return await this.authService.signUp(dto, creatorRole);
  }

  @SkipAuth()
  @Post('sign-in')
  public async signIn(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    return await this.authService.signIn(dto);
  }

  @ApiBearerAuth()
  @Post('sign-out')
  public async signOut(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.authService.signOut(userData);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }

  @ApiBearerAuth()
  @Post('sign-up-manager')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  public async signUpManager(
    @Body() signUpManagerDto: SignUpManagerReqDto,
  ): Promise<AuthManagerResDto> {
    const signUpReqDto = UserMapper.toSignUpReqDto(signUpManagerDto);
    return await this.authService.signUp(signUpReqDto, UserRole.ADMIN);
  }
}
