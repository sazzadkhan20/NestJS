import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common';

// entry point of the project
// main function
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global configuration/setting
  // validate automatically from bodies
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes properties not defined in DTO
      forbidNonWhitelisted: true, // Throws an error instead of silently removing fields
      transform: true, // auto transform data type what needed
      disableErrorMessages: false, // Hides detailed validation errors
    }),
  );
  // .env setup
  // starts a http server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
