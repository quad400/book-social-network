import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/config.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { Mongoose } from '../config/mongoos.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, Config } from '@app/common';
import { HistoryModule } from './history/history.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigurationModule,
    UserModule,
    Mongoose,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      url: Config.REDIS_URL,
      ttl: 30000,
      max: 10,
    }),
     BullModule.forRoot({
      redis: {
        host: Config.REDIS_HOST,
        port: Config.REDIS_PORT
      }
     }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    BookModule,
    AuthModule,
    HistoryModule,
    EmailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class UserServiceModule {}
