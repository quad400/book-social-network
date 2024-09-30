import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Config } from '@app/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

    
  await app.listen(Config.PORT, Config.HOST);
  Logger.log(
    `Application is running with base url of ${Config.HOST}:${Config.PORT}/api/v1`,
  );
  }
bootstrap();
