import { Controller } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { MailService } from './mail.service';
import { TransmitWelcomeEmailPayload } from './type';

@Controller()
export class MailController {
  constructor(private mailService: MailService) {}

  @OnEvent('transmitWelcomeEmail')
  public async sendMail(payload: TransmitWelcomeEmailPayload) {
    return this.mailService.sendMail(payload);
  }
}
