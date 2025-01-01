import { IsOptional, IsString } from 'class-validator';

export class ReportDto {
  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;
}
