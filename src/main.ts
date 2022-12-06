import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './errors/AllExeption';

async function bootstrap() {
  const PORT = process.env.PORT || 3030;

  const app = await NestFactory.create(AppModule);

  const adapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));
  await app.listen(PORT, () => {
    console.log('Listen app port-->>' + PORT);
  });
}
bootstrap();
