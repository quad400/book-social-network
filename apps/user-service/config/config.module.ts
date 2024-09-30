import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        HOST: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
      envFilePath: '.env',
    }),
  
  ],
})
export class ConfigurationModule {}
