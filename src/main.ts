import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3001'],
  });
  app.use(
    graphqlUploadExpress({
      maxFileSize: 1000000,
      maxFiles: 1,
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
