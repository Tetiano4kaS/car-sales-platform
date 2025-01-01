import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CurrencyService {
  constructor(private readonly httpService: HttpService) {}

  async convertCurrency(amount: number, currency: string) {
    const rates = await this.getExchangeRates();
    return {
      usd: currency === 'USD' ? amount : amount / rates.USD,
      eur: currency === 'EUR' ? amount : amount / rates.EUR,
      uah: currency === 'UAH' ? amount : amount * rates.UAH,
    };
  }

  private async getExchangeRates() {
    const response = await lastValueFrom(
      this.httpService.get(
        'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
      ),
    );

    const rates = response.data.reduce((acc, rate) => {
      acc[rate.ccy] = parseFloat(rate.sale);
      return acc;
    }, {});

    return { USD: rates.USD, EUR: rates.EUR, UAH: 1 };
  }
}
