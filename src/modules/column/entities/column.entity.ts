export class Column {
  id: string;
  title: string;
  order: number;
  tasks?: string[];

  constructor(id: string, title: string, order: number, tasks?: string[]) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.tasks = tasks;
  }

  static fromDoc(
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
      doc.get('tasks') as string[] | undefined,
    );
  }
}
