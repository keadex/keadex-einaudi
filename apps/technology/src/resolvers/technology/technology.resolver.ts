import {
  Args,
  Resolver,
  ResolveReference,
  Query,
  Mutation,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { Technology } from '../../models/technology.model';
import { TechnologyService } from '../../services/technology/technology.service';
import {
  ListTechnologiesDto,
  CreateTechnologyDto,
  UpdateTechnologyDto,
} from '../../dto/technology.dto';

@Resolver(() => Technology)
export class TechnologyResolver {
  constructor(private technologyService: TechnologyService) {}

  @Query(() => Technology, { name: 'technology' })
  async getTechnology(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ): Promise<Technology> {
    return this.technologyService.findById(_id);
  }

  @Query(() => [Technology], { name: 'technologies' })
  async getTechnologies(
    @Args('filters', { nullable: true }) filters?: ListTechnologiesDto,
  ) {
    return this.technologyService.list(filters);
  }

  @Mutation(() => Technology)
  async createTechnology(@Args('payload') payload: CreateTechnologyDto) {
    return this.technologyService.create(payload);
  }

  @Mutation(() => Technology)
  async updateTechnology(@Args('payload') payload: UpdateTechnologyDto) {
    return this.technologyService.update(payload);
  }

  @Mutation(() => Technology)
  async deleteTechnology(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ) {
    return this.technologyService.delete(_id);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: Schema.Types.ObjectId;
  }): Promise<Technology> {
    return this.technologyService.findById(reference._id);
  }
}
