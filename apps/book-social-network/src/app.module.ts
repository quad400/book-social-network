import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Config } from '@app/common';
import { UserController } from 'apps/user-service/src/user/user.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { UserServiceModule } from 'apps/user-service/src/user-service.module';
import { AuthController } from 'apps/user-service/src/auth/auth.controller';
import { UserService } from 'apps/user-service/src/user/user.service';
import { AuthService } from 'apps/user-service/src/auth/auth.service';
import { GatewayModule } from '@app/common';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Config.USER_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [Config.RABBIT_MQ_URL],
          queue: Config.RABBIT_MQ_USER_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: Config.HUB_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [Config.RABBIT_MQ_URL],
          queue: Config.RABBIT_MQ_HUB_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    GatewayModule
  ],
})
export class AppModule {}
