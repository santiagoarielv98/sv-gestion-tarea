export interface Tag {
  _id: string;
  title: string;
  inputValue?: string;
}

export interface TagCreate {
  title: string;
}

export interface TagUpdate {
  _id: string;
  title?: string;
}
