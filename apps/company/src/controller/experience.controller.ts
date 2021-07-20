import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EVENTS, SERVICES_NAMES } from '../constants';
import { Experience, ExperienceDocument } from '../models/experience.model';
import { CreateExperienceDto } from '../dto/experience.dto';

@Controller()
export class ExperienceController {
  constructor(
    @Inject(SERVICES_NAMES.COMPANY_SERVICE) private client: ClientProxy,
    @InjectModel(Experience.name)
    private experienceModel: Model<ExperienceDocument>,
  ) {}

  @EventPattern(EVENTS.EXPERIENCE_CREATED)
  async handleUserCreated(data: any) {
    const createExperienceDto: CreateExperienceDto = data.value;
    console.log('New experience created');
    const newExperience = new this.experienceModel(createExperienceDto);
    newExperience.save();
  }
}
