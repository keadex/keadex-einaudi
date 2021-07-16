import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ExperienceModule } from './experience.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(ExperienceModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [
          process.env.EXPERIENCE_MS_KAFKA_HOST +
            ':' +
            process.env.EXPERIENCE_MS_KAFKA_PORT,
        ],
      },
    },
  });

  app.startAllMicroservices();
  await app.listen(process.env.EXPERIENCE_MS_TCP_PORT);
  console.log(`Experience microservice is running on: ${await app.getUrl()}`);
}
bootstrap();
