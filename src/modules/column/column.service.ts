import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { ColumnRepository } from './column.repository';

@Injectable()
export class ColumnService {
  constructor(private readonly repository: ColumnRepository) {}

  create(userId: string, dto: CreateColumnDto) {
    return this.repository.create(userId, dto);
  }

  findAll(userId: string) {
    return this.repository.findAll(userId);
  }

  findOne(userId: string, id: string) {
    return this.repository.findOne(userId, id.trim());
  }
}
