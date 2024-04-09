import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}
  async create(createTaskDto: CreateTaskDto) {
    return await this.tasksRepository.create({
      ...createTaskDto,
    });
  }

  async findAll() {
    return await this.tasksRepository.findAll();
  }

  async findOne(id: string) {
    return await this.tasksRepository.findOne(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.tasksRepository.updateOne(id, updateTaskDto);
  }

  async delete(id: string) {
    return await this.tasksRepository.deleteOne(id);
  }
}
