import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  create(createTaskDto: CreateTaskDto) {
    this.logger.log('logloglogloglogloglog');
    this.logger.debug('debugdebugdebugdebugdebugdebugdebug');
    this.logger.error('errorerrorerrorerrorerrorerrorerror');
    this.logger.fatal('fatalfatalfatalfatalfatalfatalfatal');
    this.logger.verbose('verboseverboseverboseverboseverboseverboseverbose');
    this.logger.warn('warnwarnwarnwarnwarnwarnwarn');

    return createTaskDto;
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
