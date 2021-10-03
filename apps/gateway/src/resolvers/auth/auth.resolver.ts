import { Args, Resolver, Mutation, GqlExecutionContext } from '@nestjs/graphql';
import {
  createParamDecorator,
  ExecutionContext,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { Client } from '../../models/client.model';
import { AuthService } from '../../services/auth/auth.service';
import { LocalAuthGuard } from '../../passport/local-auth.guard';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs();
    return request.user;
  },
);

@Resolver(() => Client)
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);

  constructor(private authService: AuthService) {}

  @Mutation(() => Client)
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() client: Client, @Args('apiKey') apiKey: string) {
    return this.authService.login(client);
  }
}
