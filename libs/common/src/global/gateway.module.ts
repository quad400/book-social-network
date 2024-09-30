import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { AuthController } from 'apps/user-service/src/auth/auth.controller';
import { AuthService } from 'apps/user-service/src/auth/auth.service';
import { BookRepository } from 'apps/user-service/src/book/respository/book.repository';
import { BookService } from 'apps/user-service/src/book/service/book.service';
import { UserRepository } from 'apps/user-service/src/user/repository/user.repository';
import { UserController } from 'apps/user-service/src/user/user.controller';
import { UserService } from 'apps/user-service/src/user/user.service';
import { Config } from '../config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Global()
@Module({
  imports: [
    // CacheModule.register({
    //   isGlobal: true,
    //   store: redisStore,
    //   url: Config.REDIS_URL,
    //   ttl: 30000,
    //   max: 10,
    // }),
    BullModule.forRoot({
      redis: {
        host: Config.REDIS_HOST,
        port: Config.REDIS_PORT,
      },
    }),
    
    BullModule.registerQueue({
        name: Config.SEND_EMAIL_QUEUE,
        defaultJobOptions: {
          removeOnComplete: true,
          attempts:5,
          removeOnFail: true
        }
      }),
  ],
  exports: [
    // CacheModule.register({
    //     isGlobal: true,
    //     store: redisStore,
    //     url: Config.REDIS_URL,
    //     ttl: 30000,
    //     max: 10,
    //   }),
       BullModule.forRoot({
        redis: {
          host: Config.REDIS_HOST,
          port: Config.REDIS_PORT
        }
       }),
  ],
  controllers: [UserController, AuthController, BookService],
  providers: [
    UserRepository,
    // BookRepository,
    // AuthService,
    // UserService,
    // BookService,
  ],
})
export class GatewayModule {}
