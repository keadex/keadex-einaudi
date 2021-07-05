import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Experience } from '../../models/experience.model';
import { Company } from '../../models/company.model';
import { ExperienceService } from '../../services/experience/experience.service';
import { AddCompaniesToExperienceDto } from '../../dto/experience.dto';

@Resolver(() => Experience)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Mutation(() => Experience)
  async addCompaniesToExperience(
    @Args('payload') payload: AddCompaniesToExperienceDto,
  ) {
    return this.experienceService.addCompaniesToExperience(payload);
  }

  @ResolveField(() => [Company], { name: 'companies' })
  public companies(@Parent() experience: Experience) {
    return this.experienceService.companiesForExperience(experience._id);
  }
}
