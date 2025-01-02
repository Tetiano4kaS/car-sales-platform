import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CurrencyService {
  constructor(private readonly httpService: HttpService) {}

  async convertCurrency(amount: number, currency: string) {
    const rates = await this.getExchangeRates();

    if (!rates[currency]) {
      throw new BadRequestException(`Unsupported currency: ${currency}`);
    }

    return {
      usd: this.convertTo(amount, currency, 'USD', rates),
      eur: this.convertTo(amount, currency, 'EUR', rates),
      uah: this.convertTo(amount, currency, 'UAH', rates),
    };
  }

  private convertTo(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
    rates: any,
  ): number {
    if (fromCurrency === toCurrency) {
      return amount;
    }

    const amountInUAH =
      fromCurrency === 'UAH' ? amount : amount * (rates[fromCurrency] || 1);

    return toCurrency === 'UAH'
      ? amountInUAH
      : amountInUAH / (rates[toCurrency] || 1);
  }

  private async getExchangeRates() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(
          'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
        ),
      );

      const rates = response.data.reduce((acc, rate) => {
        acc[rate.ccy] = parseFloat(rate.sale);
        return acc;
      }, {});

      return {
        USD: rates.USD || 1,
        EUR: rates.EUR || 1,
        UAH: 1,
      };
    } catch (error) {
      throw new BadRequestException('Failed to fetch exchange rates');
    }
  }
}
