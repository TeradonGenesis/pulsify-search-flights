import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //set up the dto validation checking
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  //set up the swagger configs
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Search flights api")
    .setDescription("Search flights API using SkyScanner Rapid API. Click the Authorize button and enter your API key")
    .setVersion("1.0")
    .addApiKey({
      type: 'apiKey',
      name: 'x-api-key',
      in: 'header',
      description: 'Enter your API key here'
    }, 'x-api-key')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(
    'api',
    app,
    document,
    {
      swaggerOptions: {
        securityDefinitions: {
          'x-api-key': {
            type: 'apiKey',
            in: 'header',
            name: 'x-api-key'
          }
        },
        security: [
          {
            'x-api-key': [],
          },
        ],
      }
    });

  await app.listen(process.env.PORT ?? 3000);

  console.log(`listening on port ${process.env.PORT ?? 3000}`)
}
bootstrap();
