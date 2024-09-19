import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/config.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { Mongoose } from '../config/mongoos.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/common';

@Module({
  imports: [
    ConfigurationModule,
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class UserServiceModule {}
