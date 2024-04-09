import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';

const tasks: Task[] = [
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
  async findAll(): Promise<Task[]> {
    return tasks;
  }

  async findOne(id: string): Promise<Task> {
    return tasks.find((task) => task.id === id);
  }
}
