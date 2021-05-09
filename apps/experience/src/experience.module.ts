import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './services/experience.service';
import ConfigSchemaValidator from './config/config.schema-validator';
import { Experience, ExperienceSchema } from './models/experience.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'],
      isGlobal: true,
      cache: true,
      validationSchema: ConfigSchemaValidator,
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_EXPERIENCE),
    MongooseModule.forFeature([
      { name: Experience.name, schema: ExperienceSchema },
    ]),
  ],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
