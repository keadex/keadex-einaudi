import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EVENTS } from '../constants';
import { Experience, ExperienceDocument } from '../models/experience.model';
import { CreateExperienceDto } from '../dto/experience.dto';

@Controller()
export class ExperienceController {
  private readonly logger = new Logger(ExperienceController.name);
  constructor(
    @InjectModel(Experience.name)
    private experienceModel: Model<ExperienceDocument>,
  ) {}

  @EventPattern(EVENTS.EXPERIENCE_CREATED)
  async handleUserCreated(data: any) {
    const createExperienceDto: CreateExperienceDto = data.value;
    this.logger.log('New experience created');
    const newExperience = new this.experienceModel(createExperienceDto);
    newExperience.save();
  }
}
