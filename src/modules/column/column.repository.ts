import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { FirebaseAppProvider } from 'src/modules/firebase/firebase-app-provider';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnRepository {
  private readonly collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(firebaseApp: FirebaseAppProvider) {
    this.collection = firebaseApp.firestore.collection('column-task');
  }

  getCollection(userId: string) {
    return this.collection.doc(userId).collection('columns');
  }

  getDocRef(userId: string, columnId?: string) {
    return columnId
      ? this.getCollection(userId).doc(columnId)
      : this.getCollection(userId).doc();
  }

  findOne(userId: string, columnId: string) {
    return this.getDocRef(userId, columnId).get();
  }

  findAll(userId: string) {
    return this.getCollection(userId).orderBy('order').get();
  }

  async create(userId: string, dto: CreateColumnDto) {
    const columnRef = this.getDocRef(userId);

    await columnRef.set({
      title: dto.title,
      order: dto.order,
    });

    return columnRef.get();
  }

  async update(userId: string, dto: UpdateColumnDto) {
    const { id, ...updateData } = dto;
    await this.getDocRef(userId, id).update(updateData);
  }

  delete(userId: string, columnId: string) {
    return this.getDocRef(userId, columnId).delete();
  }
}
