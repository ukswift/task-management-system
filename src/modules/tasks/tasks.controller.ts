import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
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
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    this.logger.log('Fetching tasks');
    this.logger2.info('222');
    this.logger2.assign({ tid: 2 });
    this.logger2.info('ipopppopop');
    const tasks = await this.tasksService.findAll();
    this.logger.log('Fetched tasks sucessfully');
    return tasks;
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
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tasksService.remove(id);
  }
}
