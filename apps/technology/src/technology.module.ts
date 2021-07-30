import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TechnologyService } from './services/technology/technology.service';
import ConfigSchemaValidator from './config/config.schema-validator';
import { Technology, TechnologySchema } from './models/technology.model';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { join } from 'path';
import { TechnologyResolver } from './resolvers/technology/technology.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CONFIG_KEYS, SERVICES_NAMES } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['apps/technology/.development.env', 'apps/technology/.env'],
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
          uri: configService.get(CONFIG_KEYS.DATABASE_TECHNOLOGY),
          useFindAndModify: false,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Technology.name, schema: TechnologySchema },
    ]),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(
        process.cwd(),
        'apps/technology/src/_autogenerated/schema.gql',
      ),
      playground: true,
      sortSchema: true,
      debug: true,
    }),
    ClientsModule.registerAsync([
      {
        name: SERVICES_NAMES.TECHNOLOGY_SERVICE,
        useFactory: async (configService: ConfigService) => {
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'technology',
                brokers: [
                  configService.get(CONFIG_KEYS.TECHNOLOGY_MS_KAFKA_HOST) +
                    ':' +
                    configService.get(CONFIG_KEYS.TECHNOLOGY_MS_KAFKA_PORT),
                ],
              },
              consumer: {
                groupId: 'technology-consumer',
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [TechnologyService, TechnologyResolver],
})
export class TechnologyModule {}
