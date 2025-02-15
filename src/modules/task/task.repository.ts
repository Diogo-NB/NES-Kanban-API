import { Injectable } from '@nestjs/common';
import { FirebaseAppProvider } from 'src/modules/firebase/firebase-app-provider';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskRepository {
  private readonly collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(firebaseApp: FirebaseAppProvider) {
    this.collection = firebaseApp.firestore.collection('tasks-tab');
  }

  getCollection(userId: string, tabId: string) {
    return this.collection
      .doc(userId)
      .collection('tabs')
      .doc(tabId)
      .collection('tasks');
  }

  getDocRef(userId: string, tabId: string, taskId?: string) {
    return taskId
      ? this.getCollection(userId, tabId).doc(taskId)
      : this.getCollection(userId, tabId).doc();
  }

  findOne(userId: string, tabId: string) {
    return this.getDocRef(userId, tabId).get();
  }

  findManyByTab(userId: string, tabId: string) {
    return this.getCollection(userId, tabId).get();
  }

  async create(userId: string, dto: CreateTaskDto) {
    const tabRef = this.getDocRef(userId, dto.tabId);

    await tabRef.set({ ...dto });

    return tabRef.get();
  }

  async update(userId: string, dto: UpdateTaskDto) {
    const { id, ...updateData } = dto;
    await this.getDocRef(userId, id).update(updateData);
  }

  delete(userId: string, tabId: string) {
    return this.getDocRef(userId, tabId).delete();
  }
}
