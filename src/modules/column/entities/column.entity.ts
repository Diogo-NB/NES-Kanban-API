export class Column {
  id: string;
  title: string;
  order: number;

  constructor(id: string, title: string, order: number) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static fromDocSnapshot(
    doc:
      | FirebaseFirestore.QueryDocumentSnapshot
      | FirebaseFirestore.DocumentSnapshot,
  ): Column {
    if (!doc.exists) {
      throw new Error(`Document with id ${doc.id} does not exist`);
    }

    return new Column(
      doc.id,
      doc.get('title') as string,
      doc.get('order') as number,
    );
  }
}
