import { IsString } from 'class-validator';
import { configDotenv } from 'dotenv';

configDotenv()
class AppConfigure {
  @IsString()
  readonly JWT_SECRET = process.env.JWT_SECRET;
  @IsString()
  readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
}

export const AppConfig = new AppConfigure();
