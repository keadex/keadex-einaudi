import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyService } from './services/company/company.service';
import ConfigSchemaValidator from './config/config.schema-validator';
import { Company, CompanySchema } from './models/company.model';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { join } from 'path';
import { CompanyResolver } from './resolvers/company/company.resolver';
import { ExperienceResolver } from './resolvers/experience/experience.resolver';
import { Experience, ExperienceSchema } from './models/experience.model';
import { ExperienceService } from './services/experience/experience.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CONFIG_KEYS, SERVICES_NAMES } from './constants';
import { ExperienceController } from './controller/experience.controller';
import { Employer, EmployerSchema } from './models/employer.model';
import { EmployerResolver } from './resolvers/employer/employer.resolver';
import { EmployerService } from './services/employer/employer.service';
import { JwtStrategy } from '@keadex/corelib';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `${
          process.env.NODE_ENV !== 'production' ? 'apps/company/' : ''
        }.development.env`,
        `${process.env.NODE_ENV !== 'production' ? 'apps/company/' : ''}.env`,
      ],
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
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get(CONFIG_KEYS.DATABASE_COMPANY),
          useFindAndModify: false,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: Experience.name, schema: ExperienceSchema },
      { name: Employer.name, schema: EmployerSchema },
    ]),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(
        process.cwd(),
        'apps/company/src/_autogenerated/schema.gql',
      ),
      playground: true,
      sortSchema: true,
      debug: true,
      buildSchemaOptions: {
        orphanedTypes: [Experience],
      },
    }),
    ClientsModule.registerAsync([
      {
        name: SERVICES_NAMES.COMPANY_SERVICE,
        useFactory: async (configService: ConfigService) => {
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'company',
                brokers: [
                  configService.get(CONFIG_KEYS.COMPANY_MS_KAFKA_HOST) +
                    ':' +
                    configService.get(CONFIG_KEYS.COMPANY_MS_KAFKA_PORT),
                ],
              },
              consumer: {
                groupId: 'company-consumer',
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    CompanyService,
    CompanyResolver,
    ExperienceService,
    ExperienceResolver,
    EmployerService,
    EmployerResolver,
    JwtStrategy,
  ],
  controllers: [ExperienceController],
})
export class CompanyModule {}
