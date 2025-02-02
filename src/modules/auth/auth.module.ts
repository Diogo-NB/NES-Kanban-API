import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [UsersModule, FirebaseModule],
  providers: [AuthGuard, AuthService],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
