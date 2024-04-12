import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';

export interface Pagination {
  pageSize: number;
  pageNumber: number;
}

export const PaginationParams = createParamDecorator(
  (data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();

    const pageNumber = Number(req.query.pageNumber);
    const pageSize = Number(req.query.pageSize);

    return { pageNumber, pageSize };
  },
  [
    (target: any, key: string) => {
      // Here it is. Use the `@ApiQuery` decorator purely as a function to define the meta only once here.
      ApiQuery({
        name: 'pageNumber',
        schema: { default: 1, type: 'number', minimum: 1 },
        required: false,
      })(target, key, Object.getOwnPropertyDescriptor(target, key));
      ApiQuery({
        name: 'pageSize',
        schema: { default: 78, type: 'number', minimum: 1 },
        required: false,
      })(target, key, Object.getOwnPropertyDescriptor(target, key));
    },
  ],
);
