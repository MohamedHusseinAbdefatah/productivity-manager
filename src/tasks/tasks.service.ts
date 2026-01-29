import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // CREATE a new task
  async create(data: Partial<Task>) {
  // Transform dueDate from string to Date if it exists
  if (data.dueDate && typeof data.dueDate === 'string') {
    data.dueDate = new Date(data.dueDate);
  }

  const task = this.taskRepository.create(data);
  return await this.taskRepository.save(task);
}


  // GET all tasks
  async findAll() {
    return await this.taskRepository.find();
  }

  // GET a single task by ID
  async findOne(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, data: Partial<Task>) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    Object.assign(task, data);
    return await this.taskRepository.save(task);
  }

  async remove(id: number) {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return { message: `Task with ID ${id} deleted successfully` };
  }
}
