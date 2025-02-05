import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { FirebaseAppProvider } from 'src/modules/firebase/firebase-app-provider';
import { Column } from './entities/column.entity';

@Injectable()
export class ColumnRepository {
  private readonly collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(firebaseApp: FirebaseAppProvider) {
    this.collection = firebaseApp.firestore.collection('column-task');
  }

  async create(userId: string, dto: CreateColumnDto) {
    console.log('Creating column with data:', dto);

    const columnRef = this.collection.doc(userId).collection('columns').doc();

    await columnRef.set({
      title: dto.title,
      order: dto.order,
      createdAt: new Date(),
    });

    return columnRef.id;
  }

  async findAll(userId: string): Promise<Column[]> {
    const snapshot = await this.collection
      .doc(userId)
      .collection('columns')
      .get();

    return snapshot.docs.map((doc) => Column.fromDoc(doc));
  }

  async findOne(userId: string, columnId: string): Promise<Column> {
    const test = await this.collection
      .doc(userId)
      .collection('columns')
      .doc(columnId)
      .get();

    return Column.fromDoc(test);
  }
}
