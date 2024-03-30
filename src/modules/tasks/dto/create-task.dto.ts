import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
  isObject,
} from 'class-validator';
class Some {
  @IsString()
  @IsNotEmpty()
  s1: string;
  @IsString()
  @IsNotEmpty()
  s2: string;
  @IsString()
  @IsNotEmpty()
  s3: string;
}
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ValidateNested()
  @Type(() => Some)
  @IsNotEmpty()
  some: Some;

  @ValidateNested({ each: true })
  @Type(() => Some)
  @IsNotEmpty()
  @IsObject({ each: true })
  @IsArray()
  some2: Some[];
}
