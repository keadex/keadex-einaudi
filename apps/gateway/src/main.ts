import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { config } from 'dotenv';

config({ path: 'apps/gateway/.env' });

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(3000);
}
bootstrap();
