import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Experience } from '../../models/experience.model';
import { ExperienceService } from '../../services/experience/experience.service';
import { AddSkillsToExperienceDto } from '../../dto/experience.dto';
import { ExperienceSkill } from '../../models/experience-skill.model';

@Resolver(() => Experience)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Mutation(() => Experience)
  async addSkillsToExperience(
    @Args('payload') payload: AddSkillsToExperienceDto,
  ) {
    return this.experienceService.addSkillsToExperience(payload);
  }

  @ResolveField(() => [ExperienceSkill], { name: 'skills' })
  public skills(@Parent() experience: Experience) {
    return this.experienceService.skillsForExperience(experience._id);
  }
}
