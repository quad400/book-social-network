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
        JWT_EXPIRES_IN: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
      envFilePath: './apps/user-service/.env',
    }),
  
  ],
})
export class ConfigurationModule {}
