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
import { query } from 'express';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  private readonly logger = new Logger(TasksController.name);
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    this.logger.log(createTaskDto);
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(@Query() x: PaginationQueryDto) {
    console.log(x);
    return await this.tasksService.findAll();
  }
  @Get('/ww')
  async findAll2(@PaginationParams() x: PaginationQueryDto) {
    console.log(x);
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
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
}
