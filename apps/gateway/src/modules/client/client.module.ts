import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG_KEYS } from '../../constants';
import { Client, ClientSchema } from '../../models/client.model';
import { Role, RoleSchema } from '../../models/role.model';
import { ClientResolver } from '../../resolvers/client/client.resolver';
import { RoleResolver } from '../../resolvers/role/role.resolver';
import { ClientService } from '../../services/client/client.service';
import { RoleService } from '../../services/role/role.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get(CONFIG_KEYS.DATABASE_CLIENT),
          useFindAndModify: false,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [ClientResolver, ClientService, RoleResolver, RoleService],
  exports: [ClientService, ClientResolver, RoleResolver],
})
export class ClientModule {}
