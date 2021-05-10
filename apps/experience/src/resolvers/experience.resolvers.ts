import { Args, Resolver, ResolveReference, Query } from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { Experience } from '../models/experience.model';
import { ExperienceService } from '../services/experience/experience.service';

@Resolver((of) => Experience)
export class ExperienceResolvers {
  constructor(private experienceService: ExperienceService) {}

  @Query((returns) => Experience)
  async getExperience(
    @Args('id') id: Schema.Types.ObjectId,
  ): Promise<Experience> {
    return this.experienceService.findById(id);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: Schema.Types.ObjectId;
  }): Promise<Experience> {
    return this.experienceService.findById(reference.id);
  }
}
