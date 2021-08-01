import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperienceService } from '../../services/experience/experience.service';
import { ExperienceResolver } from '../../resolvers/experience/experience.resolver';
import { Experience, ExperienceSchema } from '../../models/experience.model';
import { ExperienceController } from '../../controller/experience.controller';
import {
  ExperienceSkillSchema,
  ExperienceSkill,
} from '../../models/experience-skill.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Experience.name, schema: ExperienceSchema },
      { name: ExperienceSkill.name, schema: ExperienceSkillSchema },
    ]),
  ],
  providers: [ExperienceService, ExperienceResolver],
  controllers: [ExperienceController],
})
export class ExperienceModule {}
