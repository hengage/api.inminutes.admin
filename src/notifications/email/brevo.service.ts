import * as brevo from '@getbrevo/brevo';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ejs from 'ejs';
import { join } from 'path';

interface SendEmailData {
  templatePath: string;
  templateData: object;
  subject: string;
  recipientEmail: string;
  recipientName?: string;
}

@Injectable()
export class BrevoService {
  private apiInstance: brevo.TransactionalEmailsApi;

  constructor(private configService: ConfigService) {
    this.apiInstance = new brevo.TransactionalEmailsApi();
    this.apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      this.configService.get('BREVO_API_KEY'),
    );
  }

  async sendTransactionalEmail(data: SendEmailData) {
    const {
      templatePath,
      templateData,
      subject,
      recipientEmail,
      recipientName,
    } = data;

    // Load and render the EJS template
    const htmlContent = await ejs.renderFile(templatePath, templateData);

    // Create the email payload
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = {
      name: this.configService.get('EMAIL_SENDER_NAME'),
      email: this.configService.get('SENDER_EMAIL'),
    };
    sendSmtpEmail.to = [{ email: recipientEmail, name: recipientName }];

    // Send the email
    return await this.apiInstance.sendTransacEmail(sendSmtpEmail);
  }

  async sendOtpEmail(params: {
    recipientEmail: string;
    otp: number | string;
    recipientName?: string;
  }) {
    const { recipientEmail, recipientName, otp } = params;
    const subject = 'Your OTP Code for Verification';
    const templatePath = join(process.cwd(), 'src/views', 'otp.ejs');
    const templateData = { otp };

    try {
      return await this.sendTransactionalEmail({
        subject,
        recipientEmail,
        recipientName,
        templatePath,
        templateData,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to send OTP email');
    }
  }
}
