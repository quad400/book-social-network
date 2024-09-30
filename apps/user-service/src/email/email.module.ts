import { Module } from '@nestjs/common';
import { EmailProcessor } from './email.processor';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Config } from '@app/common';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: Config.MAIL_HOST,
        port: Config.MAIL_PORT,
        // service: Config.MAIL_SERVICE,
        secure: Config.MAIL_SECURE,
        auth: {
          user: Config.MAIL_USERNAME,
          pass: Config.MAIL_PASSWORD,
        },
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
      },
    }),
  ],
  providers: [EmailProcessor],
})
export class EmailModule {}
