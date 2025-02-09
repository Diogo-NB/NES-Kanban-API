import { Injectable } from '@nestjs/common';
import { CreateTabDto } from './dto/create-tab.dto';
import { FirebaseAppProvider } from 'src/modules/firebase/firebase-app-provider';
import { UpdateTabDto } from './dto/update-tab.dto';

@Injectable()
export class TabRepository {
  private readonly collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(firebaseApp: FirebaseAppProvider) {
    this.collection = firebaseApp.firestore.collection('tasks-tab');
  }

  getCollection(userId: string) {
    return this.collection.doc(userId).collection('tabs');
  }

  getDocRef(userId: string, tabId?: string) {
    return tabId
      ? this.getCollection(userId).doc(tabId)
      : this.getCollection(userId).doc();
  }

  findOne(userId: string, tabId: string) {
    return this.getDocRef(userId, tabId).get();
  }

  findAll(userId: string) {
    return this.getCollection(userId).orderBy('order').get();
  }

  async create(userId: string, dto: CreateTabDto) {
    const tabRef = this.getDocRef(userId);

    await tabRef.set({
      title: dto.title,
      order: dto.order,
    });

    return tabRef.get();
  }

  async update(userId: string, dto: UpdateTabDto) {
    const { id, ...updateData } = dto;
    await this.getDocRef(userId, id).update(updateData);
  }

  delete(userId: string, tabId: string) {
    return this.getDocRef(userId, tabId).delete();
  }
}
