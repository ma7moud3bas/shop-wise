import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from '../lib/filters/prisma-client-exception.filter';
import { TransformResponseInterceptor } from '../lib/interceptors/transform-response.interceptor';
import { HttpExceptionFilter } from '../lib/filters/https-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)
  const config = new DocumentBuilder()
    .setTitle('SwiftShop API')
    .setDescription('The SwiftShop API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // binds ValidationPipe to the entire application
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  // 👇 apply transform to all responses

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)), new TransformResponseInterceptor());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter), new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
