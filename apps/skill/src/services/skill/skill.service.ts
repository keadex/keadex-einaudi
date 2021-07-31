import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  CreateSkillDto,
  ListSkillsDto,
  UpdateSkillDto,
} from '../../dto/skill.dto';
import { Skill, SkillDocument } from '../../models/skill.model';

@Injectable()
export class SkillService {
  constructor(
    @InjectModel(Skill.name)
    private skillModel: Model<SkillDocument>,
  ) {}

  create(skillDto: CreateSkillDto): Promise<Skill> {
    const createdSkill = new this.skillModel(skillDto);
    return createdSkill.save();
  }

  findById(_id: MongooseSchema.Types.ObjectId) {
    return this.skillModel.findById(_id).exec();
  }

  list(filters: ListSkillsDto) {
    return this.skillModel.find({ ...filters }).exec();
  }

  update(payload: UpdateSkillDto) {
    return this.skillModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.skillModel.findByIdAndDelete(_id).exec();
  }
}
