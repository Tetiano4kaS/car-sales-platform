import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { ConfirmPaymentDto } from '../models/dto/confirm.payment.dto';
import { PaymentDto } from '../models/dto/payment.dto';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe('YOUR_STRIPE_SECRET_KEY', {
      apiVersion: '2024-11-20.acacia',
    });
  }

  async createPaymentIntent(
    dto: PaymentDto,
    userId: string,
  ): Promise<Stripe.PaymentIntent> {
    return await this.stripe.paymentIntents.create({
      amount: dto.amount,
      currency: dto.currency,
      metadata: { userId: userId },
    });
  }

  async confirmPayment(dto: ConfirmPaymentDto): Promise<Stripe.PaymentIntent> {
    const payment = await this.stripe.paymentIntents.retrieve(
      dto.paymentIntentId,
    );

    if (payment.status !== 'succeeded') {
      throw new Error('Payment not completed');
    }

    return payment;
  }
}
