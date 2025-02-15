import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TabModule } from '../tab/tab.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TaskController],
  imports: [TabModule, FirebaseModule, AuthModule],
  providers: [TaskService, TaskRepository],
  exports: [TaskRepository],
})
export class TaskModule {}
