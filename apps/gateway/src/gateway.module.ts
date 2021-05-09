import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from '@nestjs/graphql';
import { BuildServiceModule } from './build-service.module';

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        gateway: {
          serviceList: [
            /* services */
          ],
        },
        server: {
          context: ({ req }) => ({
            jwt: req.headers.authorization,
          }),
        },
      }),
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
  providers: [GatewayService],
})
export class GatewayModule {}
