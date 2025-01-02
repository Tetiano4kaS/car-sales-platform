import { IsEnum, IsNumber, IsString, MaxLength, Min } from 'class-validator';

import { Currency } from '../../enums/currency.enum';

export class CreateAdDto {
  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(50)
  brand: string;

  @IsString()
  @MaxLength(50)
  model: string;

  @IsNumber()
  @Min(1960)
  year: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(Currency, { message: 'Currency must be USD, EUR, or UAH' })
  currency: Currency;

  @IsString()
  @MaxLength(500)
  description: string;

  @IsString()
  @MaxLength(150)
  region: string;
}
