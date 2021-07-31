import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SkillModule } from './skill.module';
import * as dotenv from 'dotenv';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(SkillModule, {
    logger: WinstonModule.createLogger({
      level: process.env.LOG_LEVEL,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        new DailyRotateFile({
          dirname: process.env.LOG_DIR_NAME,
          filename: process.env.LOG_FILE_NAME,
          datePattern: process.env.LOG_FILE_NAME_DATE_PATTERN,
          format: winston.format.combine(
            winston.format.timestamp({
              format: process.env.LOG_DATE_PATTERN,
            }),
            winston.format.printf(
              (info) =>
                `${[info.timestamp]} ${info.level.toUpperCase()}: [${
                  info.context ? info.context : `--`
                }] ${info.message}`,
            ),
          ),
        }),
      ],
    }),
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'skill', // skill-server
        brokers: [
          process.env.SKILL_MS_KAFKA_HOST +
            ':' +
            process.env.SKILL_MS_KAFKA_PORT,
        ],
      },
      consumer: {
        groupId: 'skill-consumer', // skill-consumer-server
      },
    },
  });

  app.startAllMicroservices();
  await app.listen(process.env.SKILL_MS_TCP_PORT);
  console.log(`Skill microservice is running on: ${await app.getUrl()}`);
}
bootstrap();
