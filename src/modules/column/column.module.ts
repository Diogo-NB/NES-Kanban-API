import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { ColumnRepository } from './column.repository';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [FirebaseModule, AuthModule],
  controllers: [ColumnController],
  providers: [ColumnService, ColumnRepository],
  exports: [ColumnRepository],
})
export class ColumnModule {}
