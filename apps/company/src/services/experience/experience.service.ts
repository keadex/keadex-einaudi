import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { AddCompaniesToExperienceDto } from '../../dto/experience.dto';
import { Experience, ExperienceDocument } from '../../models/experience.model';
import { Company, CompanyDocument } from '../../models/company.model';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<CompanyDocument>,
    @InjectModel(Experience.name)
    private experienceModel: Model<ExperienceDocument>,
  ) {}

  async companiesForExperience(_id: MongooseSchema.Types.ObjectId) {
    console.log('ciao ' + _id);
    const experience = await this.experienceModel
      .findById(_id)
      .populate({ path: 'companies', model: this.companyModel })
      .exec();
    console.log('fine');
    console.log(experience);
    return experience.companies;
  }

  addCompaniesToExperience(payload: AddCompaniesToExperienceDto) {
    return this.experienceModel
      .findByIdAndUpdate(
        payload._id,
        { $push: { companies: { $each: payload.companies } } },
        { new: true },
      )
      .exec();
  }
}
