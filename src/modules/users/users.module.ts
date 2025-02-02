import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  controllers: [],
  imports: [FirebaseModule],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
