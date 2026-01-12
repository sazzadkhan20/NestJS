import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// entry point of the project
// main function
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global configuration/setting
  // .env setup
  // starts a http server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
