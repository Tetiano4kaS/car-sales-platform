import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ConfirmPaymentDto } from './models/dto/confirm.payment.dto';
import { PaymentDto } from './models/dto/payment.dto';
import { PaymentService } from './services/payment.service';

@ApiBearerAuth()
@ApiTags('Subscription')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async createPaymentIntent(
    @Body() dto: PaymentDto,
    @CurrentUser('userId') userId: string,
  ) {
    return await this.paymentService.createPaymentIntent({ ...dto }, userId);
  }

  @Post('confirm')
  async confirmPayment(@Body() dto: ConfirmPaymentDto) {
    return await this.paymentService.confirmPayment(dto);
  }
}
