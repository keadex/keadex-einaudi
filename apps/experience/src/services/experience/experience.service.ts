import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { EVENTS, SERVICES_NAMES } from '../../constants';
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
    @Inject(SERVICES_NAMES.EXPERIENCE_SERVICE) private client: ClientProxy,
  ) {}

  create(experienceDto: CreateExperienceDto): Promise<Experience> {
    const createdExperience = new this.experienceModel(experienceDto);
    this.client.emit(EVENTS.EXPERIENCE_CREATED, experienceDto);
    return createdExperience.save();
  }

  findById(_id: MongooseSchema.Types.ObjectId) {
    return this.experienceModel.findById(_id).populate('tasks').exec();
  }

  list(filters: ListExperienceDto) {
    return this.experienceModel
      .find({ ...filters })
      .populate('tasks')
      .exec();
  }

  update(payload: UpdateExperienceDto) {
    return this.experienceModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .populate('tasks')
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.experienceModel.findByIdAndDelete(_id).populate('tasks').exec();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
