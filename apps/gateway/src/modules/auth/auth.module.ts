import { Module } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { ClientModule } from '../client/client.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG_KEYS } from '../../constants';
import { AuthResolver } from '../../resolvers/auth/auth.resolver';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { join } from 'path';
import { LocalStrategy } from '../../passport/local.strategy';
import { JWT_SECRET_KEY } from '@keadex/corelib';
import { JwtStrategy } from '@keadex/corelib';

@Module({
  imports: [
    ClientModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get(JWT_SECRET_KEY),
          signOptions: {
            expiresIn: configService.get(CONFIG_KEYS.JWT_EXPIRES_IN),
          },
        };
      },
      inject: [ConfigService],
    }),
    GraphQLFederationModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          autoSchemaFile: join(
            process.cwd(),
            'apps/gateway/src/_autogenerated/schema.gql',
          ),
          path: configService.get(CONFIG_KEYS.GRAPHQL_ROUTING_URL),
          playground: true,
          sortSchema: true,
          debug: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, AuthResolver, JwtStrategy],
})
export class AuthModule {}
