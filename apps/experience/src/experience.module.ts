import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperienceService } from './services/experience/experience.service';
import ConfigSchemaValidator from './config/config.schema-validator';
import { Experience, ExperienceSchema } from './models/experience.model';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['apps/experience/.development.env', 'apps/experience/.env'],
      isGlobal: true,
      cache: true,
      validationSchema: ConfigSchemaValidator,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('DATABASE_EXPERIENCE'),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Experience.name, schema: ExperienceSchema },
    ]),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      sortSchema: true,
      debug: true,
    }),
    TaskModule,
  ],
  providers: [ExperienceService],
})
export class ExperienceModule {}
