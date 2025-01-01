import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
