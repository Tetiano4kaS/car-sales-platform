import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AdController } from './advertisement.controller';
import { AdService } from './services/advertisement.service';
import { CurrencyService } from './services/currency.service';

@Module({
  imports: [HttpModule],
  controllers: [AdController],
  providers: [AdService, CurrencyService],
  exports: [AdService],
})
export class AdvertisementModule {}
