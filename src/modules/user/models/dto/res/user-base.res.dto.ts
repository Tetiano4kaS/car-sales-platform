import { ApiProperty } from '@nestjs/swagger';

export class UserBaseResDto {
  @ApiProperty({ type: String })
  id: string;
  name: string;
  email: string;
}
