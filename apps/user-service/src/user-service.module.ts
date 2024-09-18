import { Module } from '@nestjs/common';
import { LogModule } from '../config/logger.module';
import { ConfigurationModule } from '../config/config.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { Mongoose } from '../config/mongoos.module';

@Module({
  imports: [
    ConfigurationModule,
    LogModule,
    UserModule,
    Mongoose,
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    BookModule,
    AuthModule,
  ],
})
export class UserServiceModule {}
