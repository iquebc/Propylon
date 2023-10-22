export interface IDocument {
  id: string;
  name: string;
  level: number;
  parent_id: string;
  content: string;
  linkedDocuments: Array<IDocument>;
}

export class Document {
  #id: string;
  #name: string;
  #level: number;
  #parentId: string;
  #content: string;
  #linkedDocuments: Array<Document>;
  #selected: boolean;

  constructor(
    id: string,
    name: string,
    level: number,
    parentId: string,
    content: string
  ) {
    this.#id = id;
    this.#content = content;
    this.#name = name;
    this.#level = level;
    this.#parentId = parentId;
    this.#linkedDocuments = [];
    this.#selected = false;
  }

  selectDocument() {
    this.#selected = true;
  }

  unselectDocument(){
    this.#selected = false;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get level() {
    return this.#level;
  }

  get content() {
    return this.#content;
  }

  get parentId() {
    return this.#parentId;
  }

  get isSelected() {
    return this.#selected;
  }

  get linkedDocuments() {
    return this.#linkedDocuments;
  }

  addLinkedDocuments(linkedDocuments: Document[]) {
    this.#linkedDocuments = linkedDocuments;
  }

  static objToModel(obj: any) {
    return new Document(
      obj.id,
      obj.name,
      +obj.level,
      obj.parent_id,
      obj.content
    );
  }

  static jsonToTree(data: Document[]):Document[] {
    const level1: Document[] = data.filter((x: Document) => x.level == 1);
    const tree: Document[] = level1.map((node: Document) => {
      const document = new Document(
        node.id,
        node.name,
        node.level,
        node.parentId,
        node.content
      );
      document.addLinkedDocuments(Document.getNodes(data, node.id));
      return document;
    });
    return tree
  }

  static getNodes(
    treeData: Document[],
    parentId: string | null = null
  ): Document[] {
    const result: Document[] = [];

    for (const node of treeData) {
      if (node.parentId === parentId) {
        const children = this.getNodes(treeData, node.id);

        if (children.length > 0) {
          node.addLinkedDocuments(children);
        }
        const document: Document = new Document(
          node.id,
          node.name,
          node.level,
          node.parentId,
          node.content
        );
        document.addLinkedDocuments(children);
        result.push(document);
      }
    }

    return result;
  }
}
