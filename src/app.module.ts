import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import configuration from './configs/configuration';
import { AdvertisementModule } from './modules/advertisement/advertisement.module';
import { AuthModule } from './modules/auth/auth.module';
import { CarsModule } from './modules/cars/cars.module';
import { LoggerModule } from './modules/logger/logger.module';
import { PaymentModule } from './modules/payment/payment.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RedisModule } from './modules/redis/redis.module';
import { ReportModule } from './modules/report/report.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    LoggerModule,
    RepositoryModule,
    PostgresModule,
    RedisModule,

    AuthModule,
    UserModule,
    PaymentModule,
    AdvertisementModule,
    CarsModule,
    ReportModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
