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
import { Roles, RoleType, JwtAuthGuard } from '@keadex/corelib';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Experience)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Mutation(() => Experience)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
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
