import { BadRequestException, Injectable } from '@nestjs/common';

import { AdvertisementRepository } from '../../repository/services/advertisement.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { CreateAdDto } from '../models/dto/req/createAd.req.dto';
import { CurrencyService } from './currency.service';

@Injectable()
export class AdService {
  constructor(
    private readonly adRepository: AdvertisementRepository,
    private readonly userRepository: UserRepository,
    private readonly currencyService: CurrencyService,
  ) {}

  async createAd(dto: CreateAdDto, userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['accountType'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.accountType.name === 'basic') {
      const activeAdsCount = await this.adRepository.count({
        where: { user: { id: userId }, status: 'active' },
      });

      if (activeAdsCount >= 1) {
        throw new BadRequestException('Basic account allows only 1 active ad');
      }
    }

    const { usd, eur, uah } = await this.currencyService.convertCurrency(
      dto.price,
      dto.currency,
    );

    const ad = this.adRepository.create({
      ...dto,
      user,
      convertedPriceUSD: usd,
      convertedPriceEUR: eur,
      convertedPriceUAH: uah,
      status: 'draft',
    });

    return await this.adRepository.save(ad);
  }
}
