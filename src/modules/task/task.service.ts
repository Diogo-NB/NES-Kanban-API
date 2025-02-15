import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { TabRepository } from '../tab/tab.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly tabRepository: TabRepository,
  ) {}

  async create(userId: string, dto: CreateTaskDto): Promise<Task | null> {
    const newTabSnapshot = await this.taskRepository.create(userId, dto);

    if (!newTabSnapshot.exists) return null;

    return Task.fromDocSnapshot(newTabSnapshot);
  }

  async findByTab(userId: string, tabId: string): Promise<Task[]> {
    const tasksSnapshot = await this.taskRepository.findManyByTab(
      userId,
      tabId,
    );

    return tasksSnapshot.docs.map(Task.fromDocSnapshot);
  }

  async findAll(userId: string): Promise<{ tabId: string; tasks: Task[] }[]> {
    const tabsSnapshot = await this.tabRepository.findAll(userId);

    const groupedTasksSnapshot = await Promise.all(
      tabsSnapshot.docs.map((tabDoc) =>
        this.findByTab(userId, tabDoc.id).then((tasks) => ({
          tabId: tabDoc.id,
          tasks,
        })),
      ),
    );

    return groupedTasksSnapshot;
  }

  async findOne(userId: string, tabId: string): Promise<Task | null> {
    const tabSnapshot = await this.taskRepository.findOne(userId, tabId);

    if (!tabSnapshot.exists) return null;

    return Task.fromDocSnapshot(tabSnapshot);
  }

  async delete(userId: string, tabId: string): Promise<void> {
    await this.taskRepository.delete(userId, tabId);
  }

  async update(userId: string, dto: UpdateTaskDto): Promise<void> {
    await this.taskRepository.update(userId, dto);
  }
}
