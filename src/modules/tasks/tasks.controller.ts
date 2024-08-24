import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { TaskNotFoundException } from './exceptions';
import { PaginationParams } from '../../common/decorators/pagination-params.decorator';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { PinoLogger } from 'nestjs-pino';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  protected readonly logger = new Logger(TasksController.name);
  private readonly logger2: PinoLogger;
  constructor(protected readonly tasksService: TasksService) {
    this.logger2 = new PinoLogger({});
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    this.logger.log(createTaskDto);
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(@Query() x: PaginationQueryDto) {
    this.logger.log('Fetching tasks');
    this.logger2.info('222');
    this.logger2.assign({ tid: 2 });
    this.logger2.info('ipopppopop');
    const tasks = await this.tasksService.findAll();
    this.logger.log('Fetched tasks sucessfully');
    return tasks;
  }
  @Get('/ww')
  async findAll2(@PaginationParams() x: PaginationQueryDto) {
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log('Getting taks by id in controller', { taskId: id });
    this.logger.log({
      stuff: {
        onetype: [
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Don Joeh' },
        ],
        othertype: { id: 2, company: 'ACME' },
      },
      otherstuff: {
        thing: [
          [1, 42],
          [2, 2],
        ],
      },
    });
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new TaskNotFoundException(id);
    }
    return task;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksService.update(id, updateTaskDto);
    if (!task) {
      throw new TaskNotFoundException(id);
    }
    return task;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const task = await this.tasksService.delete(id);
    if (!task) {
      throw new TaskNotFoundException(id);
    }
    return task;
  }
  async remove(@Param('id') id: string) {
    return await this.tasksService.remove(id);
  }
}
