import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { CreateRoleDto, ListRoleDto, UpdateRoleDto } from '../../dto/role.dto';
import { Role, RoleDocument } from '../../models/role.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,
  ) {}

  create(roleDto: CreateRoleDto): Promise<Role> {
    const newRole = new this.roleModel(roleDto);
    return newRole.save();
  }

  findById(_id: MongooseSchema.Types.ObjectId) {
    return this.roleModel.findById(_id).exec();
  }

  list(filters: ListRoleDto) {
    return this.roleModel.find({ ...filters }).exec();
  }

  update(payload: UpdateRoleDto) {
    return this.roleModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.roleModel.findByIdAndDelete(_id).exec();
  }
}
