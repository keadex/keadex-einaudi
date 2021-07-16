import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CompanyModule } from './company.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(CompanyModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [
          process.env.COMPANY_MS_KAFKA_HOST +
            ':' +
            process.env.COMPANY_MS_KAFKA_PORT,
        ],
      },
    },
  });

  app.startAllMicroservices();
  await app.listen(process.env.COMPANY_MS_TCP_PORT);
  console.log(`Company microservice is running on: ${await app.getUrl()}`);
}
bootstrap();
