import { Module } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from '@nestjs/graphql';
import { BuildServiceModule } from './build-service.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import ConfigSchemaValidator from './config/config.schema-validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['apps/gateway/.development.env', 'apps/gateway/.env'],
      isGlobal: true,
      cache: true,
      validationSchema: ConfigSchemaValidator,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      expandVariables: true,
    }),
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        gateway: {},
        server: {
          context: ({ req }) => ({
            jwt: req.headers.authorization,
          }),
        },
      }),
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
    AuthModule,
  ],
})
export class GatewayModule {}
