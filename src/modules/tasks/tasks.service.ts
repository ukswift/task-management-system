import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './tasks.repository';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TasksService {
  protected readonly logger = new Logger(TasksService.name);
  constructor(private tasksRepository: TasksRepository) {}
  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    this.logger.log('logloglogloglogloglog');
    this.logger.debug('debugdebugdebugdebugdebugdebugdebug');
    this.logger.error('errorerrorerrorerrorerrorerrorerror');
    this.logger.fatal('fatalfatalfatalfatalfatalfatalfatal');
    this.logger.verbose('verboseverboseverboseverboseverboseverboseverbose');
    this.logger.warn('warnwarnwarnwarnwarnwarnwarn');
    return await this.tasksRepository.create({
      ...createTaskDto,
    });
  }

  async findAll(): Promise<TaskEntity[]> {
    this.logger.log('Fetching tasks');
    const tasks = await this.tasksRepository.findAll();
    this.logger.log('Fetched tasks sucessfully');
    return tasks;
  }

  async findOne(id: string): Promise<TaskEntity> {
    this.logger.log('Getting taks by id in service');
    return await this.tasksRepository.findOne(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    return await this.tasksRepository.updateOne(id, updateTaskDto);
  }

  async delete(id: string): Promise<TaskEntity> {
    return await this.tasksRepository.deleteOne(id);
  }
  async remove(id: string) {
    return {} as any;
  }
}
