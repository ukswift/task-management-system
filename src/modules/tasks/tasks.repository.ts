import { Injectable } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Model } from 'mongoose';

const tasks: TaskEntity[] = [
  { id: 't1', title: 'Title1', summary: 'Task1 summary', tags: ['finance'] },
  { id: 't2', title: 'Title2', summary: 'Task2 summary', tags: ['IT', 'Ops'] },
  {
    id: 't3',
    title: 'Title3',
    summary: 'Task3 summary',
    tags: ['finance', 'sales'],
  },
];

@Injectable()
export class TasksRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(task: Task) {
    const document = await this.taskModel.create(task);
    const x = document.toJSON();
    return x;
  }

  async findAll(): Promise<TaskEntity[]> {
    return tasks;
  }

  async findOne(id: string): Promise<TaskEntity> {
    return tasks.find((task) => task.id === id);
  }
}
