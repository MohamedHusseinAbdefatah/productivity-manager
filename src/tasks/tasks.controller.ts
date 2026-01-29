import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    const taskData = {
      ...createTaskDto,
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : undefined,
    };
    return await this.tasksService.create(taskData);
  }

  @Get()
  async getAllTasks() {
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async getTask(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.findOne(id);
  }

  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<CreateTaskDto>,  // You can create a separate Update DTO later
  ) {
    const processedData = {
      ...updateData,
      dueDate: updateData.dueDate ? new Date(updateData.dueDate) : undefined,
    };
    return await this.tasksService.update(id, processedData);
  }

  @Delete(':id')
  async removeTask(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.remove(id);
  }
}
