import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { TransmitWelcomeEmailPayload } from './type';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}
  private configOptions = {
    host: this.configService.get<string>('SMTP_HOST'),
    port: 465,
    secure: true,
    auth: {
      user: this.configService.get<string>('SMTP_USERNAME'),
      pass: this.configService.get<string>('SMTP_PASSWORD'),
    },
  };

  private transporter = nodemailer.createTransport(this.configOptions);

  private endpoint = 'https://ngs.co.kr';
  public async sendMail(payload: TransmitWelcomeEmailPayload) {
    console.log(payload, 'payload 메시지 발송 시작');
    try {
      if (
        payload.email === undefined ||
        payload.nickname === undefined ||
        payload.verificationCode === undefined
      ) {
        throw new Error('payload is undefined');
      }
      await this.transporter.sendMail({
        from: 'info@ngs.co.kr',
        to: payload.email, // list of receivers
        subject: `🕹 가입 확인 - Let's Play!`,
        text: '테스트테스트',
        html: `<h1>Ready, ${payload.nickname}? 🎮</h1>
              <p>우리의 게임 세계에 오신 것을 환영해요! <br>이 버튼을 클릭하면 당신만의 모험이 시작됩니다:</p>
              <a href="${this.endpoint}/users/verify-email/${payload.userId}/${payload.verificationCode}" style="background-color: #32CD32; color: white; padding: 12px 24px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; border-radius: 10px;">Play Now</a>
              <p>새로운 친구들과 놀라운 모험들이 기다리고 있어요! 🌈</p>
              <p>함께 놀아요!<br><strong>Nak Gop Sae</strong> Squad 🌟</p>
              `, // html body
      });
    } catch (error) {
      console.log(error);
    }
  }
}
