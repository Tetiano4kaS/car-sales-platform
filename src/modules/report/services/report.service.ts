import { BadRequestException, Injectable } from '@nestjs/common';

import { ReportRepository } from '../../repository/services/report.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ReportDto } from '../dto/report.req.dto';
import { NotificationService } from './notification.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly reportRepository: ReportRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async reportMissingBrandOrModel(reportDto: ReportDto, userId: string) {
    const { brand, model } = reportDto;

    if (!brand && !model) {
      throw new BadRequestException(
        'You must specify at least a brand or model.',
      );
    }

    const report = this.reportRepository.create({
      brand,
      model,
      userId,
      status: 'pending',
    });

    await this.reportRepository.save(report);

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || !user.email) {
      throw new Error('User email not found');
    }

    const message = `New missing brand/model report:
    Brand: ${brand || 'Not specified'}
    Model: ${model || 'Not specified'}
    Reported by user: ${user.email}`;

    await this.notificationService.sendFromSystem(
      user.email,
      process.env.ADMIN_EMAIL,
      message,
    );

    return { message: 'Your report has been submitted to the administration.' };
  }
}
