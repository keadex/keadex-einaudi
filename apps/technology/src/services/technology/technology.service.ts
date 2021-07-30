import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  CreateTechnologyDto,
  ListTechnologiesDto,
  UpdateTechnologyDto,
} from '../../dto/technology.dto';
import { Technology, TechnologyDocument } from '../../models/technology.model';

@Injectable()
export class TechnologyService {
  constructor(
    @InjectModel(Technology.name)
    private technologyModel: Model<TechnologyDocument>,
  ) {}

  create(technologyDto: CreateTechnologyDto): Promise<Technology> {
    const createdTechnology = new this.technologyModel(technologyDto);
    return createdTechnology.save();
  }

  findById(_id: MongooseSchema.Types.ObjectId) {
    return this.technologyModel.findById(_id).exec();
  }

  list(filters: ListTechnologiesDto) {
    return this.technologyModel.find({ ...filters }).exec();
  }

  update(payload: UpdateTechnologyDto) {
    return this.technologyModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.technologyModel.findByIdAndDelete(_id).exec();
  }
}
