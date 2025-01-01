import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ReportDto } from './dto/report.req.dto';
import { ReportService } from './services/report.service';

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('missing-brand-or-model')
  async reportMissingBrandOrModel(
    @Body() reportDto: ReportDto,
    @CurrentUser('userId') userId: string,
  ): Promise<{ message: string }> {
    return await this.reportService.reportMissingBrandOrModel(
      reportDto,
      userId,
    );
  }
}
