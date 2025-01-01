import { Module } from '@nestjs/common';

import { UserRepository } from '../repository/services/user.repository';
import { ReportController } from './report.controller';
import { NotificationService } from './services/notification.service';
import { ReportService } from './services/report.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService, NotificationService, UserRepository],
  exports: [ReportService, NotificationService, UserRepository],
})
export class ReportModule {}
