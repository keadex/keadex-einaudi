import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  CreateExperienceDto,
  ListExperienceDto,
  UpdateExperienceDto,
} from '../../dto/experience.dto';
import { Experience, ExperienceDocument } from '../../models/experience.model';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience.name)
    private experienceModel: Model<ExperienceDocument>,
  ) {}

  create(experienceDto: CreateExperienceDto): Promise<Experience> {
    const createdExperience = new this.experienceModel(experienceDto);
    return createdExperience.save();
  }

  findById(_id: MongooseSchema.Types.ObjectId) {
    return this.experienceModel.findById(_id).exec();
  }

  list(filters: ListExperienceDto) {
    return this.experienceModel.find({ ...filters }).exec();
  }

  update(payload: UpdateExperienceDto) {
    return this.experienceModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.experienceModel.findByIdAndDelete(_id).exec();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
