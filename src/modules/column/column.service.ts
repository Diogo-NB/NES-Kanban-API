import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { ColumnRepository } from './column.repository';
import { Column } from './entities/column.entity';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnService {
  constructor(private readonly repository: ColumnRepository) {}

  async create(userId: string, dto: CreateColumnDto): Promise<Column | null> {
    const newcolumnDocSnapshot = await this.repository.create(userId, dto);

    if (!newcolumnDocSnapshot.exists) return null;

    return Column.fromDocSnapshot(newcolumnDocSnapshot);
  }

  async findAll(userId: string): Promise<Column[]> {
    const columnsQuerySnapshot = await this.repository.findAll(userId);

    return columnsQuerySnapshot.docs.map(Column.fromDocSnapshot);
  }

  async findOne(userId: string, columnId: string): Promise<Column | null> {
    const columnDocSnapshot = await this.repository.findOne(userId, columnId);

    if (!columnDocSnapshot.exists) return null;

    return Column.fromDocSnapshot(columnDocSnapshot);
  }

  async delete(userId: string, columnId: string): Promise<void> {
    await this.repository.delete(userId, columnId);
  }

  async update(userId: string, dto: UpdateColumnDto): Promise<void> {
    await this.repository.update(userId, dto);
  }
}
