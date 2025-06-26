import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 👈 THIS is required
    }),
  );

  app.enableCors();
  setupSwagger(app);
  await app.listen(process.env.PORT);
}
bootstrap();
