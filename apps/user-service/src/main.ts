import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { Config, HttpExceptions, ValidatorPipe } from '@app/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: [Config.RABBIT_MQ_URL], // RabbitMQ URL
      queue: Config.RABBIT_MQ_HUB_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });
  
  app.useGlobalPipes(ValidatorPipe());

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptions(httpAdapterHost));

}
bootstrap();
