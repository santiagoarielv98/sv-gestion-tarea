export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  labels: Label[];
  priority: Priority;
  isCompleted: boolean;
  __v: number;
}

export interface Label {
  _id: string;
  name: string;
  color: string;
  __v: number;
}

export enum Priority {
  High = "high",
  Low = "low",
  Medium = "medium",
  Urgent = "urgent",
}
