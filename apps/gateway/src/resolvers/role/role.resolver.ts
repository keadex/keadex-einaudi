import {
  Args,
  Resolver,
  ResolveReference,
  Query,
  Mutation,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { Role } from '../../models/role.model';
import { RoleService } from '../../services/role/role.service';
import { ListRoleDto, CreateRoleDto, UpdateRoleDto } from '../../dto/role.dto';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Roles, RoleType } from '@keadex/corelib';

@Resolver(() => Role)
export class RoleResolver {
  private readonly logger = new Logger(RoleResolver.name);

  constructor(private roleService: RoleService) {}

  @Query(() => Role, { name: 'role' })
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async getRole(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ): Promise<Role> {
    return this.roleService.findById(_id);
  }

  @Query(() => [Role], { name: 'roles' })
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async getRoles(@Args('filters', { nullable: true }) filters?: ListRoleDto) {
    return this.roleService.list(filters);
  }

  @Mutation(() => Role)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async createRole(@Args('payload') payload: CreateRoleDto) {
    return this.roleService.create(payload);
  }

  @Mutation(() => Role)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async updateRole(@Args('payload') payload: UpdateRoleDto) {
    return this.roleService.update(payload);
  }

  @Mutation(() => Role)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async deleteRole(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ) {
    return this.roleService.delete(_id);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: Schema.Types.ObjectId;
  }): Promise<Role> {
    return this.roleService.findById(reference._id);
  }
}
