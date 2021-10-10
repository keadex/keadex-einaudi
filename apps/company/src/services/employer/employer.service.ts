import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  CreateEmployerDto,
  ListEmployersDto,
  UpdateEmployerDto,
} from '../../dto/employer.dto';
import { Employer, EmployerDocument } from '../../models/employer.model';

@Injectable()
export class EmployerService {
  constructor(
    @InjectModel(Employer.name)
    private employerModel: Model<EmployerDocument>,
  ) {}

  create(employerDto: CreateEmployerDto): Promise<Employer> {
    const createdEmployer = new this.employerModel(employerDto);
    return createdEmployer.save();
  }

  findById(_id: MongooseSchema.Types.ObjectId) {
    return this.employerModel.findById(_id).populate('company').exec();
  }

  list(filters: ListEmployersDto) {
    return this.employerModel
      .find({ ...filters })
      .populate('company')
      .exec();
  }

  update(payload: UpdateEmployerDto) {
    return this.employerModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .populate('company')
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.employerModel.findByIdAndDelete(_id).populate('company').exec();
  }
}
