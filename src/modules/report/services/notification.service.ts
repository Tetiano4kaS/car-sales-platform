import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendFromSystem(userEmail: string, adminEmail: string, message: string) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        replyTo: userEmail,
        subject: 'New Notification from User',
        text: message,
      };

      await this.transporter.sendMail(mailOptions);

      console.log(
        `Notification sent from ${process.env.EMAIL_USER} (Reply-To: ${userEmail}) to admin:`,
        message,
      );
    } catch (error) {
      console.error('Failed to send notification:', error.message);
      throw new Error('Notification service failed');
    }
  }
}
