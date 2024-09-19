import { IsBoolean, IsNumber, IsString } from 'class-validator';

class Configuration {
  @IsString()
  readonly MONGODB_URI = process.env.MONGODB_URI;
  @IsNumber()
  readonly PORT = process.env.PORT;
  @IsString()
  readonly HOST = process.env.HOST;

  @IsBoolean()
  readonly IS_PRODUCTION = process.env.NODE_ENV === 'production';
}

export const Config = new Configuration();
