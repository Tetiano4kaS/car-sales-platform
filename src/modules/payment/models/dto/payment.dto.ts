import { IsInt, IsString, Min } from 'class-validator';

export class PaymentDto {
  @IsInt()
  @Min(1)
  amount: number;

  @IsString()
  currency: string;
}
