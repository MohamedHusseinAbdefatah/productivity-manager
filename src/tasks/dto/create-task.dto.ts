import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { Priority } from '../task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
