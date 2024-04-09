import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './tasks.repository';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}
  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return await this.tasksRepository.create({
      ...createTaskDto,
    });
  }

  async findAll(): Promise<TaskEntity[]> {
    return await this.tasksRepository.findAll();
  }

  async findOne(id: string): Promise<TaskEntity> {
    return await this.tasksRepository.findOne(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    return await this.tasksRepository.updateOne(id, updateTaskDto);
  }

  async delete(id: string): Promise<TaskEntity> {
    return await this.tasksRepository.deleteOne(id);
  }
}
