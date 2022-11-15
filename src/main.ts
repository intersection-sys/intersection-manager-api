import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const CORSOptions: CorsOptions = {
    allowedHeaders: [
      'Origin',
      'Content-Type',
      'Accept',
      'authorization',
      'Authorization',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
  };

  app.enableCors(CORSOptions);
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Production Control API')
    .setDescription('Production Control API Usage')
    .setVersion('0.1.0')
    .addTag('Companies')
    .addTag('Roles')
    .addTag('Users')
    .addTag('Auth')
    .addTag('RawMaterials')
    .addTag('Stocks')
    .addTag('Formulas')
    .addTag('Formulas')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
