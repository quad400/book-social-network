import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { Config } from '../config/configuration';
import { HttpExceptions, ValidatorPipe } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Book Social Network - User Service')
    .setDescription('Api for managing user profile and activities')
    .setVersion('1.0')
    .setContact(
      'Adediji Abdulquadri',
      'https://abdulquadri-portfolio.vercel.app/',
      'adedijiabdulquadri@gmail.com',
    )
    .addTag('users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/api-docs', app, document, {
    explorer: true,
  });

  app.useGlobalPipes(ValidatorPipe());

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptions(httpAdapterHost));

  await app.listen(Config.PORT, Config.HOST);
  Logger.log(
    `Application is running with base url of ${Config.HOST}:${Config.PORT}/api/v1`,
  );
}
bootstrap();
