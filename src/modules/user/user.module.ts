import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { UserRepository } from '../repository/services/user.repository';
import { UsersService } from './services/user.service';
import { UsersController } from './user.controller';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UserModule {}
