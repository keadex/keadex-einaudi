import { Args, Resolver, ResolveReference, Query } from '@nestjs/graphql';
import { Experience } from '../models/experience.model';
import { ExperienceService } from '../services/experience.service';

@Resolver((of) => Experience)
export class ExperienceResolvers {
  constructor(private experienceService: ExperienceService) {}

  @Query((returns) => Experience)
  getExperience(@Args('id') id: number): Experience {
    return this.experienceService.findById(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }): Experience {
    return this.experienceService.findById(reference.id);
  }
}
