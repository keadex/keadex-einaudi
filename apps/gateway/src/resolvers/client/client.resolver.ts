import {
  Args,
  Resolver,
  ResolveReference,
  Query,
  Mutation,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client/client.service';
import {
  ListClientDto,
  CreateClientDto,
  UpdateClientDto,
} from '../../dto/client.dto';
import { Logger, UseGuards } from '@nestjs/common';
import { Roles, RoleType, JwtAuthGuard } from '@keadex/corelib';

@Resolver(() => Client)
export class ClientResolver {
  private readonly logger = new Logger(ClientResolver.name);

  constructor(private clientService: ClientService) {}

  @Query(() => Client, { name: 'client' })
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async getClient(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ): Promise<Client> {
    return this.clientService.findById(_id);
  }

  @Query(() => [Client], { name: 'clients' })
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async getClients(
    @Args('filters', { nullable: true }) filters?: ListClientDto,
  ) {
    return this.clientService.list(filters);
  }

  @Mutation(() => Client)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async createClient(@Args('payload') payload: CreateClientDto) {
    return this.clientService.create(payload);
  }

  @Mutation(() => Client)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async updateClient(@Args('payload') payload: UpdateClientDto) {
    return this.clientService.update(payload);
  }

  @Mutation(() => Client)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async deleteClient(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ) {
    return this.clientService.delete(_id);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: Schema.Types.ObjectId;
  }): Promise<Client> {
    return this.clientService.findById(reference._id);
  }
}
