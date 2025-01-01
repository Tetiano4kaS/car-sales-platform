import { Global, Module } from '@nestjs/common';

import { AccountRepository } from './services/account.repository';
import { AdvertisementRepository } from './services/advertisement.repository';
import { CarBrandRepository } from './services/car-brand.repository';
import { CarModelsRepository } from './services/car-models.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { ReportRepository } from './services/report.repository';
import { RolesRepository } from './services/roles.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  UserRepository,
  RolesRepository,
  RefreshTokenRepository,
  AccountRepository,
  AdvertisementRepository,
  CarBrandRepository,
  CarModelsRepository,
  ReportRepository,
];
@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
