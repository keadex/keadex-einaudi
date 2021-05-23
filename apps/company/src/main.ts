import { NestFactory } from '@nestjs/core';
import { CompanyModule } from './company.module';

async function bootstrap() {
  const app = await NestFactory.create(CompanyModule);
  await app.listen(3002);
}
bootstrap();
