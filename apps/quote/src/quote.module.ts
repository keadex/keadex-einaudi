import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ConfigSchemaValidator from './config/config.schema-validator';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { join } from 'path';
import { QuoteResolver } from './resolvers/quote/quote.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CONFIG_KEYS, SERVICES_NAMES } from './constants';
import { QuotesAPI } from './datasources/quotes.api';
import { JwtStrategy } from '@keadex/corelib';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `${
          process.env.NODE_ENV !== 'production' ? 'apps/quote/' : ''
        }.development.env`,
        `${process.env.NODE_ENV !== 'production' ? 'apps/quote/' : ''}.env`,
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
    GraphQLFederationModule.forRoot({
      dataSources: () => ({
        quotesAPI: new QuotesAPI(),
      }),
      autoSchemaFile: join(
        process.cwd(),
        'apps/quote/src/_autogenerated/schema.gql',
      ),
      playground: true,
      sortSchema: true,
      debug: true,
    }),
    ClientsModule.registerAsync([
      {
        name: SERVICES_NAMES.QUOTE_SERVICE,
        useFactory: async (configService: ConfigService) => {
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'quote',
                brokers: [
                  configService.get(CONFIG_KEYS.QUOTE_MS_KAFKA_HOST) +
                    ':' +
                    configService.get(CONFIG_KEYS.QUOTE_MS_KAFKA_PORT),
                ],
              },
              consumer: {
                groupId: 'quote-consumer',
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [QuoteResolver, JwtStrategy],
})
export class QuoteModule {}
