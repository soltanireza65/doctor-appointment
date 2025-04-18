import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './shared/utils/swagger.utils';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  setupSwagger({ app, swaggerPath: 'docs' });

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Application is running on: ${process.env.PORT ?? 3000}`);
  });
}

bootstrap();
