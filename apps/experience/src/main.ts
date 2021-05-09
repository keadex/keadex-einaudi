import { NestFactory } from '@nestjs/core';
import { ExperienceModule } from './experience.module';

async function bootstrap() {
  const app = await NestFactory.create(ExperienceModule);
  await app.listen(3001);
}
bootstrap();
