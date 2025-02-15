export class Task {
  id: string;
  tabId: string;
  title: string;
  description?: string;
  deadline?: Date;

  constructor(
    id: string,
    tabId: string,
    title: string,
    description?: string,
    deadline?: Date,
  ) {
    this.id = id;
    this.tabId = tabId;
    this.title = title;
    this.description = description;
    this.deadline = deadline;
  }

  static fromDocSnapshot(
    doc:
      | FirebaseFirestore.QueryDocumentSnapshot
      | FirebaseFirestore.DocumentSnapshot,
  ): Task {
    if (!doc.exists) {
      throw new Error(`Document with id ${doc.id} does not exist`);
    }

    return new Task(
      doc.id,
      doc.ref.parent.parent?.id as string,
      doc.get('title') as string,
      doc.get('description') as string | undefined,
      doc.get('deadline') as Date | undefined,
    );
  }
}
