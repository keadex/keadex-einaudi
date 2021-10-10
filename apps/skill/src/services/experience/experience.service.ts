import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { AddSkillsToExperienceDto } from '../../dto/experience.dto';
import { Experience, ExperienceDocument } from '../../models/experience.model';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience.name)
    private experienceModel: Model<ExperienceDocument>,
  ) {}

  async skillsForExperience(_id: MongooseSchema.Types.ObjectId) {
    const experience = await this.experienceModel
      .findById(_id)
      .populate([{ path: 'skills', populate: { path: 'skill' } }])
      .exec();
    return experience.skills;
  }

  addSkillsToExperience(payload: AddSkillsToExperienceDto) {
    return this.experienceModel
      .findByIdAndUpdate(
        payload._id,
        { $push: { skills: { $each: payload.skills } } },
        { new: true },
      )
      .exec();
  }
}
