import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './errors/AllExeption';

async function start() {
  const PORT = process.env.PORT || 3030;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const adapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));
  await app.listen(PORT, () => {
    console.log('Listen app port-->>' + PORT);
  });
}
start();
