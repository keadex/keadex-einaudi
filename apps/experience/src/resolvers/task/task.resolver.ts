import {
  Args,
  Resolver,
  ResolveReference,
  Query,
  Mutation,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task/task.service';
import { ListTaskDto, CreateTaskDto, UpdateTaskDto } from '../../dto/task.dto';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Query(() => Task, { name: 'task' })
  async getTask(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ): Promise<Task> {
    return this.taskService.findById(_id);
  }

  @Query(() => [Task], { name: 'tasks' })
  async getTasks(@Args('filters', { nullable: true }) filters?: ListTaskDto) {
    return this.taskService.list(filters);
  }

  @Mutation(() => Task)
  async createTask(@Args('payload') payload: CreateTaskDto) {
    return this.taskService.create(payload);
  }

  @Mutation(() => Task)
  async updateTask(@Args('payload') payload: UpdateTaskDto) {
    return this.taskService.update(payload);
  }

  @Mutation(() => Task)
  async deleteTask(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ) {
    return this.taskService.delete(_id);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: Schema.Types.ObjectId;
  }): Promise<Task> {
    return this.taskService.findById(reference._id);
  }
}
