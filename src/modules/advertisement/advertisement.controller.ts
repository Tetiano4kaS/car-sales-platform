import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateAdDto } from './models/dto/req/createAd.req.dto';
import { AdService } from './services/advertisement.service';

@ApiTags('Ad')
@ApiBearerAuth()
@Controller('ads')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Post('create')
  async createAd(
    @Body() dto: CreateAdDto,
    @CurrentUser('userId') userId: string,
  ) {
    return await this.adService.createAd(dto, userId);
  }
}
