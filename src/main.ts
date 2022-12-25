import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const configSwaggerPet = new DocumentBuilder()
    .setTitle('Pets API')
    .setDescription('The Pets API')
    .setVersion('1.0')
    .addTag('pets')
    .build();

  const configSwaggerClients = new DocumentBuilder()
    .setTitle('Clients API')
    .setDescription('Clients API')
    .setVersion('1.0')
    .addTag('clients')
    .build();

  const petDocument = SwaggerModule.createDocument(app, configSwaggerPet);
  const clientsDocument = SwaggerModule.createDocument(
    app,
    configSwaggerClients,
  );
  SwaggerModule.setup('pets', app, petDocument);
  SwaggerModule.setup('clients', app, clientsDocument);
  await app.listen(3000);
}
bootstrap();
