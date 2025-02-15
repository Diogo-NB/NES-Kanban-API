import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TabModule } from './modules/tab/tab.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TaskModule,
    TabModule,
    ConfigModule.forRoot({ cache: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
