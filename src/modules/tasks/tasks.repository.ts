import { Injectable } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { BaseSchema, Task } from './task.schema';
import { Model, UpdateQueryKnownOnly } from 'mongoose';

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
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
  ) {}

  async create(task: Omit<Task, keyof BaseSchema>): Promise<TaskEntity> {
    const newTaskDoc = await this.taskModel.create(task);
    const x = newTaskDoc.toJSON();

    const { _id, __v, publicId: id, ...rest } = newTaskDoc.toJSON();
    return { id, ...rest };
  }

  async findAll(): Promise<TaskEntity[]> {
    const taskDocs = await this.taskModel.find().lean().exec();
    return taskDocs.map((taskDoc) => {
      const { _id, __v, publicId: id, ...rest } = taskDoc;
      return { id, ...rest };
    });
  }

  async findOne(id: string): Promise<TaskEntity> {
    const taskDocJson = await this.taskModel
      .findOne({ publicId: id })
      .lean()
      .exec();
    if (!taskDocJson) return null;
    const { _id, __v, publicId, ...rest } = taskDocJson;
    return { id: publicId, ...rest };
  }

  async updateOne(
    id: string,
    payload: Partial<Omit<Task, keyof BaseSchema | 'publicId'>>,
  ) {
    const taskDocJson = await this.taskModel
      .findOneAndUpdate({ publicId: id }, payload, { new: true })
      .lean()
      .exec();
    const { _id, __v, publicId, ...rest } = taskDocJson;
    return { id: publicId, ...rest };
  }

  async deleteOne(id: string) {
    const taskDocJson = await this.taskModel
      .findOneAndDelete({ publicId: id })
      .lean()
      .exec();
    if (!taskDocJson) return null;
    const { _id, __v, publicId, ...rest } = taskDocJson;
    return { id: publicId, ...rest };
  }
}
