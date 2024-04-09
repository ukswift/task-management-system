import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}
  create(createTaskDto: CreateTaskDto) {
    return createTaskDto;
  }

  async findAll() {
    return await this.tasksRepository.findAll();
  }

  async findOne(id: string) {
    return await this.tasksRepository.findOne(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
