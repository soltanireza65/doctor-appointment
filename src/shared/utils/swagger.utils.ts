import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = ({
  app,
  swaggerPath,
}: {
  app: INestApplication<any>;
  swaggerPath: string;
}) => {
  const options = new DocumentBuilder()
    .setTitle('Doctor Booking API')
    .setDescription('API for booking doctors')
    .setVersion('1.0')
    .addTag('doctor')
    .addTag('booking')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerPath, app, document);
};
