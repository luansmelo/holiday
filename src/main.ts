import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function configureSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('holiday')
    .setDescription('holiday api')
    .addBearerAuth()
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('holiday', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await configureSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}

bootstrap();
