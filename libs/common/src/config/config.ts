import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { configDotenv } from 'dotenv';

configDotenv();
class Configure {
  @IsString()
  readonly JWT_SECRET = process.env.JWT_SECRET;
  @IsString()
  readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
  @IsString()
  readonly MONGODB_URI = process.env.MONGODB_URI;
  @IsNumber()
  readonly PORT = process.env.PORT;
  @IsString()
  readonly HOST = process.env.HOST;

  @IsString()
  readonly REDIS_URL = process.env.REDIS_URL;

  @IsString()
  readonly REDIS_HOST = process.env.REDIS_HOST;

  @IsNumber()
  readonly REDIS_PORT = Number(process.env.REDIS_PORT);

  @IsBoolean()
  readonly IS_PRODUCTION = process.env.NODE_ENV === 'production';

  @IsString()
  readonly SEND_EMAIL_QUEUE = 'send-mail';

  @IsString()
  readonly MAIL_HOST = process.env.MAIL_HOST;

  @IsNumber()
  readonly MAIL_PORT = Number(process.env.MAIL_PORT);

  @IsString()
  readonly MAIL_USERNAME = process.env.MAIL_USERNAME;

  @IsString()
  readonly MAIL_PASSWORD = process.env.MAIL_PASSWORD;

  @IsBoolean()
  readonly MAIL_SECURE = Boolean(process.env.MAIL_SECURE);

  @IsString()
  readonly MAIL_SERVICE = process.env.MAIL_SERVICE;

  @IsString()
  readonly MAIL_FROM = process.env.MAIL_FROM;

  @IsString()
  readonly USER_SERVICE = 'USER_SERVICE';

  @IsString()
  readonly HUB_SERVICE = 'HUB_SERVICE';

  @IsString()
  readonly RABBIT_MQ_URL = process.env.RABBIT_MQ_URL;
  
  @IsString()
  readonly RABBIT_MQ_USER_QUEUE = process.env.RABBIT_MQ_USER_QUEUE;
  
  @IsString()
  readonly RABBIT_MQ_HUB_QUEUE = process.env.RABBIT_MQ_HUB_QUEUE;
}

export const Config = new Configure();
