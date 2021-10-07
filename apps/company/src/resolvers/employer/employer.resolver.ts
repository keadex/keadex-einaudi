import {
  Args,
  Resolver,
  ResolveReference,
  Query,
  Mutation,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { Employer } from '../../models/employer.model';
import { EmployerService } from '../../services/employer/employer.service';
import {
  ListEmployersDto,
  CreateEmployerDto,
  UpdateEmployerDto,
} from '../../dto/employer.dto';
import { Roles, RoleType, JwtAuthGuard } from '@keadex/corelib';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Employer)
export class EmployerResolver {
  constructor(private employerService: EmployerService) {}

  @Query(() => Employer, { name: 'employer' })
  @Roles(RoleType.GUEST)
  @UseGuards(JwtAuthGuard)
  async getEmployer(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ): Promise<Employer> {
    return this.employerService.findById(_id);
  }

  @Query(() => [Employer], { name: 'employers' })
  @Roles(RoleType.GUEST)
  @UseGuards(JwtAuthGuard)
  async getEmployers(
    @Args('filters', { nullable: true }) filters?: ListEmployersDto,
  ) {
    return this.employerService.list(filters);
  }

  @Mutation(() => Employer)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async createEmployer(@Args('payload') payload: CreateEmployerDto) {
    return this.employerService.create(payload);
  }

  @Mutation(() => Employer)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async updateEmployer(@Args('payload') payload: UpdateEmployerDto) {
    return this.employerService.update(payload);
  }

  @Mutation(() => Employer)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async deleteEmployer(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ) {
    return this.employerService.delete(_id);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: Schema.Types.ObjectId;
  }): Promise<Employer> {
    return this.employerService.findById(reference._id);
  }
}
