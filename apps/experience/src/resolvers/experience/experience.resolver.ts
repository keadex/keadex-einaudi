import {
  Args,
  Resolver,
  ResolveReference,
  Query,
  Mutation,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { Experience } from '../../models/experience.model';
import { ExperienceService } from '../../services/experience/experience.service';
import {
  ListExperienceDto,
  CreateExperienceDto,
  UpdateExperienceDto,
} from '../../dto/experience.dto';

@Resolver(() => Experience)
export class ExperienceResolver {
  constructor(private experienceService: ExperienceService) {}

  @Query(() => Experience, { name: 'experience' })
  async getExperience(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ): Promise<Experience> {
    return this.experienceService.findById(_id);
  }

  @Query(() => [Experience], { name: 'experiences' })
  async getExperiences(
    @Args('filters', { nullable: true }) filters?: ListExperienceDto,
  ) {
    return this.experienceService.list(filters);
  }

  @Mutation(() => Experience)
  async createExperience(@Args('payload') payload: CreateExperienceDto) {
    return this.experienceService.create(payload);
  }

  @Mutation(() => Experience)
  async updateExperience(@Args('payload') payload: UpdateExperienceDto) {
    return this.experienceService.update(payload);
  }

  @Mutation(() => Experience)
  async deleteExperience(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ) {
    return this.experienceService.delete(_id);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: Schema.Types.ObjectId;
  }): Promise<Experience> {
    return this.experienceService.findById(reference._id);
  }
}
