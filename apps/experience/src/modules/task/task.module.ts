import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from '../../models/task.model';
import { TaskResolver } from '../../resolvers/task/task.resolver';
import { TaskService } from '../../services/task/task.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
