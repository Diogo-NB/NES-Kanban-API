import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ReqUser } from '../users/user.decorator';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@ReqUser() user: User, @Body() dto: CreateTaskDto) {
    console.log('dto', dto);
    return this.taskService.create(user.id, dto);
  }

  @Get()
  findAll(@ReqUser() user: User) {
    return this.taskService.findAll(user.id);
  }

  @Get(':tabId')
  findByTab(@ReqUser() user: User, @Param('tabId') tabId: string) {
    return this.taskService.findByTab(user.id, tabId.trim());
  }

  @Get(':id')
  findOne(@ReqUser() user: User, @Param('id') id: string) {
    return this.taskService.findOne(user.id, id.trim());
  }

  @Delete(':id')
  delete(@ReqUser() user: User, @Param('id') id: string) {
    return this.taskService.delete(user.id, id.trim());
  }

  @Patch()
  update(@ReqUser() user: User, @Body() dto: UpdateTaskDto) {
    return this.taskService.update(user.id, dto);
  }
}
