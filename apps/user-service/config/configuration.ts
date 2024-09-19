import { IsBoolean, IsNumber, IsString } from 'class-validator';

class Configuration {
  @IsString()
  readonly MONGODB_URI = process.env.MONGODB_URI;
  @IsNumber()
  readonly PORT = process.env.PORT;
  @IsString()
  readonly HOST = process.env.HOST;
  @IsString()
  readonly JWT_SECRET = process.env.JWT_SECRET;
  @IsString()
  readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

  @IsBoolean()
  readonly IS_PRODUCTION = process.env.NODE_ENV === 'production';
}

export const Config = new Configuration();
