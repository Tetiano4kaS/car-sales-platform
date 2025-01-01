import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { RedisModule } from '../redis/redis.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RolesGuard } from './guards/roles.guard';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache-service';
import { TokenService } from './services/token.service';

@Module({
  imports: [JwtModule, RedisModule, UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    JwtRefreshGuard,
    RolesGuard,
    AuthService,
    AuthCacheService,
    TokenService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
