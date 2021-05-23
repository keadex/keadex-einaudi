import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  CreateCompanyDto,
  ListCompaniesDto,
  UpdateCompanyDto,
} from '../../dto/company.dto';
import { Company, CompanyDocument } from '../../models/company.model';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<CompanyDocument>,
  ) {}

  create(companyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany = new this.companyModel(companyDto);
    return createdCompany.save();
  }

  findById(_id: MongooseSchema.Types.ObjectId) {
    return this.companyModel.findById(_id).exec();
  }

  list(filters: ListCompaniesDto) {
    return this.companyModel.find({ ...filters }).exec();
  }

  update(payload: UpdateCompanyDto) {
    return this.companyModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.companyModel.findByIdAndDelete(_id).exec();
  }
}
