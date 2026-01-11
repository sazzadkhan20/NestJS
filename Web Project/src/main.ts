import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//root file - entry point(main function)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 7000);
}
bootstrap();

