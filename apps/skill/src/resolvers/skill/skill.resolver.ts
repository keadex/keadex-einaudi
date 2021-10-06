import {
  Args,
  Resolver,
  ResolveReference,
  Query,
  Mutation,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { Skill } from '../../models/skill.model';
import { SkillService } from '../../services/skill/skill.service';
import {
  ListSkillsDto,
  CreateSkillDto,
  UpdateSkillDto,
} from '../../dto/skill.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@keadex/corelib';
import { Roles } from '@keadex/corelib';
import { RoleType } from '@keadex/corelib';

@Resolver(() => Skill)
export class SkillResolver {
  constructor(private skillService: SkillService) {}

  @Query(() => Skill, { name: 'skill' })
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async getSkill(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ): Promise<Skill> {
    return this.skillService.findById(_id);
  }

  @Query(() => [Skill], { name: 'skills' })
  @Roles(RoleType.DEVELOPER)
  @UseGuards(JwtAuthGuard)
  async getSkills(
    @Args('filters', { nullable: true }) filters?: ListSkillsDto,
  ) {
    return this.skillService.list(filters);
  }

  @Mutation(() => Skill)
  async createSkill(@Args('payload') payload: CreateSkillDto) {
    return this.skillService.create(payload);
  }

  @Mutation(() => Skill)
  async updateSkill(@Args('payload') payload: UpdateSkillDto) {
    return this.skillService.update(payload);
  }

  @Mutation(() => Skill)
  async deleteSkill(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ) {
    return this.skillService.delete(_id);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: Schema.Types.ObjectId;
  }): Promise<Skill> {
    return this.skillService.findById(reference._id);
  }
}
