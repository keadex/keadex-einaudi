import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { config } from 'dotenv';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

config({ path: 'apps/gateway/.env' });

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule, {
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
  await app.listen(3000);
}
bootstrap();
