import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { setTimeout } from 'timers/promises';

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

  async findAll() {
    this.logger.warn('warnwarnwarnwarnwarnwarnwarn');
    this.logger.warn({ a: 2, b: 4, t: 'kkkkkkkkkkkkkkk' });
    await setTimeout(1000);
    this.logger.error(new Error('ssssssssss'));
    return { lll: `This action returns all tasks` };
  }

  findOne(id: number) {
    if (2) {
      console.log(223);
      return `This action returns a #${id} task`;
    } else {
    }
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(id: string): Promise<string> {
    return `This action removes a #${id} task`;
  }
}

enum Pp {
  ss = 67,
}
