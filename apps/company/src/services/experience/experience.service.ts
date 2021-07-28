import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  AddCustomersToExperienceDto,
  AddEmployersToExperienceDto,
} from '../../dto/experience.dto';
import { Experience, ExperienceDocument } from '../../models/experience.model';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience.name)
    private experienceModel: Model<ExperienceDocument>,
  ) {}

  async employersForExperience(_id: MongooseSchema.Types.ObjectId) {
    const experience = await this.experienceModel
      .findById(_id)
      .populate([{ path: 'employers', populate: { path: 'company' } }])
      .exec();
    return experience.employers;
  }

  async customersForExperience(_id: MongooseSchema.Types.ObjectId) {
    const experience = await this.experienceModel
      .findById(_id)
      .populate('customers')
      .exec();
    return experience.customers;
  }

  addEmployersToExperience(payload: AddEmployersToExperienceDto) {
    return this.experienceModel
      .findByIdAndUpdate(
        payload._id,
        { $push: { employers: { $each: payload.employers } } },
        { new: true },
      )
      .exec();
  }

  addCustomersToExperience(payload: AddCustomersToExperienceDto) {
    return this.experienceModel
      .findByIdAndUpdate(
        payload._id,
        { $push: { customers: { $each: payload.customers } } },
        { new: true },
      )
      .exec();
  }
}
