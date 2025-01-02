import { ApiProperty } from '@nestjs/swagger';

export class AdDetailsResponseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  year: number;

  @ApiProperty({ nullable: true })
  region?: string;

  @ApiProperty({ nullable: true })
  views?: number;

  @ApiProperty({ nullable: true })
  viewsByPeriod?: {
    daily: number;
    weekly: number;
    monthly: number;
  };

  @ApiProperty({ nullable: true })
  averagePriceInRegion?: number;

  @ApiProperty({ nullable: true })
  averagePriceInCountry?: number;
}
