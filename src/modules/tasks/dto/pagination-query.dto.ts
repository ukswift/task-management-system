import { IsNumber, IsOptional, Max } from 'class-validator';

export class PaginationQueryDto {
  @Max(10)
  @IsNumber()
  @IsOptional()
  pageSize?: number = 10;
  @IsNumber()
  @IsOptional()
  pageNumber?: number = 1;
}
