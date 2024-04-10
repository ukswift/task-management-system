import { NotFoundException } from '@nestjs/common';

export class TaskNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Cannot find task with id ${id}`);
  }
}
