import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { Config } from '../config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: [VERSION_NEUTRAL, '1'],
  });
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
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/api-docs', app, document);
  await app.listen(Config.PORT, Config.HOST);
  Logger.log(
    `Application is running with base url of ${Config.HOST}:${Config.PORT}/api/v1`,
  );
}
bootstrap();
