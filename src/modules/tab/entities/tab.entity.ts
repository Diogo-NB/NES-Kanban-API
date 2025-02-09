export class Tab {
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
  ): Tab {
    if (!doc.exists) {
      throw new Error(`Document with id ${doc.id} does not exist`);
    }

    return new Tab(
      doc.id,
      doc.get('title') as string,
      doc.get('order') as number,
    );
  }
}
