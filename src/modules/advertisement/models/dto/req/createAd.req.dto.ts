import { IsEnum, IsNumber, IsString, MaxLength, Min } from 'class-validator';

import { Currency } from '../../enums/currency.enum';

export class CreateAdDto {
  @IsString()
  @MaxLength(50)
  brand: string;

  @IsString()
  @MaxLength(50)
  model: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(Currency, { message: 'Currency must be USD, EUR, or UAH' })
  currency: Currency;

  @IsString()
  @MaxLength(500)
  description: string;
}
