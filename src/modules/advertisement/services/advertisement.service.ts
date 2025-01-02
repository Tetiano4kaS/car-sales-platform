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

  async incrementViews(adId: string) {
    const ad = await this.adRepository.findOne({ where: { id: adId } });
    if (!ad) {
      throw new BadRequestException('Ad not found');
    }

    ad.views += 1;
    const now = new Date();

    const viewsByPeriod = ad.viewsByPeriod || {
      daily: 0,
      weekly: 0,
      monthly: 0,
    };
    viewsByPeriod.daily += 1;
    viewsByPeriod.weekly += 1;
    viewsByPeriod.monthly += 1;

    ad.viewsByPeriod = viewsByPeriod;

    await this.adRepository.save(ad);
  }

  async getAdDetails(adId: string, userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['accountType', 'roles'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const ad = await this.adRepository.findOne({
      where: { id: adId },
      relations: ['user'],
    });

    if (!ad) {
      throw new BadRequestException('Ad not found');
    }

    if (
      ad.user.id !== userId &&
      !user.roles.some((role) => role.name === 'admin')
    ) {
      throw new BadRequestException('You do not have access to this ad');
    }

    if (user.accountType.name === 'basic') {
      return {
        title: ad.title,
        price: ad.price,
        year: ad.year,
        currency: ad.currency,
        convertedPriceUSD: ad.convertedPriceUSD,
        convertedPriceEUR: ad.convertedPriceEUR,
        convertedPriceUAH: ad.convertedPriceUAH,
      };
    }

    const averagePriceInRegion = await this.getAveragePriceInRegion(ad.region);
    const averagePriceInCountry = await this.getAveragePriceInCountry();

    return {
      title: ad.title,
      price: ad.price,
      year: ad.year,
      currency: ad.currency,
      convertedPriceUSD: ad.convertedPriceUSD,
      convertedPriceEUR: ad.convertedPriceEUR,
      convertedPriceUAH: ad.convertedPriceUAH,
      region: ad.region,
      views: ad.views,
      viewsByPeriod: ad.viewsByPeriod,
      averagePriceInRegion,
      averagePriceInCountry,
    };
  }

  private async getAveragePriceInRegion(region: string): Promise<number> {
    const result = await this.adRepository
      .createQueryBuilder('ad')
      .select('AVG(ad.price)', 'averagePrice')
      .where('ad.region = :region', { region })
      .getRawOne();

    return parseFloat(result.averagePrice) || 0;
  }

  private async getAveragePriceInCountry(): Promise<number> {
    const result = await this.adRepository
      .createQueryBuilder('ad')
      .select('AVG(ad.price)', 'averagePrice')
      .getRawOne();

    return parseFloat(result.averagePrice) || 0;
  }
}
