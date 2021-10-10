import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { CreateTaskDto, ListTaskDto, UpdateTaskDto } from '../../dto/task.dto';
import { Task, TaskDocument } from '../../models/task.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
  ) {}

  create(taskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(taskDto);
    return createdTask.save();
  }

  findById(_id: MongooseSchema.Types.ObjectId) {
    return this.taskModel.findById(_id).exec();
  }

  list(filters: ListTaskDto) {
    return this.taskModel.find({ ...filters }).exec();
  }

  update(payload: UpdateTaskDto) {
    return this.taskModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.taskModel.findByIdAndDelete(_id).exec();
  }
}
