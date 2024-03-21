import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  imports: [],
  controllers: [MailController],
  providers: [MailService],
  exports: [],
})
export class MailModule {}
