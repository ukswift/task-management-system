import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { setTimeout } from 'timers/promises';

@Injectable()
export class TasksService {
  protected readonly logger = new Logger(TasksService.name);
  create(createTaskDto: CreateTaskDto) {
    this.logger.log('logloglogloglogloglog');
    this.logger.debug('debugdebugdebugdebugdebugdebugdebug');
    this.logger.error('errorerrorerrorerrorerrorerrorerror');
    this.logger.fatal('fatalfatalfatalfatalfatalfatalfatal');
    this.logger.verbose('verboseverboseverboseverboseverboseverboseverbose');
    this.logger.warn('warnwarnwarnwarnwarnwarnwarn');

    return createTaskDto;
  }

  async findAll() {
    this.logger.log('Fetching tasks');
    const tasks = { lll: `This action returns all tasks` };
    this.logger.log('Fetched tasks sucessfully');
    return tasks;
  }

  findOne(id: number) {
    this.logger.log('Getting taks by id in service');

    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(id: string) {
    return {} as any;
  }
}
