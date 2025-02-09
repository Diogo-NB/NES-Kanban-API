import { Injectable } from '@nestjs/common';
import { CreateTabDto } from './dto/create-tab.dto';
import { TabRepository } from './tab.repository';
import { Tab } from './entities/tab.entity';
import { UpdateTabDto } from './dto/update-tab.dto';

@Injectable()
export class TabService {
  constructor(private readonly repository: TabRepository) {}

  async create(userId: string, dto: CreateTabDto): Promise<Tab | null> {
    const newTabSnapshot = await this.repository.create(userId, dto);

    if (!newTabSnapshot.exists) return null;

    return Tab.fromDocSnapshot(newTabSnapshot);
  }

  async findAll(userId: string): Promise<Tab[]> {
    const tabsSnapshot = await this.repository.findAll(userId);

    return tabsSnapshot.docs.map(Tab.fromDocSnapshot);
  }

  async findOne(userId: string, tabId: string): Promise<Tab | null> {
    const tabSnapshot = await this.repository.findOne(userId, tabId);

    if (!tabSnapshot.exists) return null;

    return Tab.fromDocSnapshot(tabSnapshot);
  }

  async delete(userId: string, tabId: string): Promise<void> {
    await this.repository.delete(userId, tabId);
  }

  async update(userId: string, dto: UpdateTabDto): Promise<void> {
    await this.repository.update(userId, dto);
  }
}
