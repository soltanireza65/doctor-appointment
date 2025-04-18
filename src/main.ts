import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './shared/utils/swagger.utils';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  setupSwagger({ app, swaggerPath: 'docs' });

  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000, () => {
    Logger.log(
      `Application is running on: ${process.env.PORT ?? 3000}`,
      'Bootstrap',
    );
  });
}

bootstrap();
