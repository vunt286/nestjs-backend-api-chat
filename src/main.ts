import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression({
    threshold: 1024 * 1024
  }));

  app.enableCors({
    origin: 'http://localhost:3000', // hoặc port React
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
  console.log(`🚀 Server running on: ${await app.getUrl()}`);
}
bootstrap();
