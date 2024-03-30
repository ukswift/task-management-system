import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  const globalRoutingPrefix = configService.get('GLOBAL_ROUTING_PREFIX');
  app.setGlobalPrefix(globalRoutingPrefix);

  const config = new DocumentBuilder()
    .setTitle('Task management system')
    .setDescription('Manage your tasks with Restful APIs')
    .setVersion('0.0.1')
    // .addBearerAuth()
    // .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalRoutingPrefix, app, document);

  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
