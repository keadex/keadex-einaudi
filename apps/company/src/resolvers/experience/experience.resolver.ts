import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Experience } from '../../models/experience.model';
import { ExperienceService } from '../../services/experience/experience.service';
import {
  AddCustomersToExperienceDto,
  AddEmployersToExperienceDto,
} from '../../dto/experience.dto';
import { Employer } from '../../models/employer.model';
import { Company } from '../../models/company.model';

@Resolver(() => Experience)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Mutation(() => Experience)
  async addEmployersToExperience(
    @Args('payload') payload: AddEmployersToExperienceDto,
  ) {
    return this.experienceService.addEmployersToExperience(payload);
  }

  @Mutation(() => Experience)
  async addCustomersToExperience(
    @Args('payload') payload: AddCustomersToExperienceDto,
  ) {
    return this.experienceService.addCustomersToExperience(payload);
  }

  @ResolveField(() => [Employer], { name: 'employers' })
  public employers(@Parent() experience: Experience) {
    return this.experienceService.employersForExperience(experience._id);
  }

  @ResolveField(() => [Company], { name: 'customers' })
  public customers(@Parent() experience: Experience) {
    return this.experienceService.customersForExperience(experience._id);
  }
}
