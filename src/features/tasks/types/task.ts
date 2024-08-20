import type { Tag } from '@/features/labels/types/tag';

export interface Task {
  _id: string;
  title: string;
  desc: string;
  dueDate: Date | string;
  tags: Tag[];
  priority: string;
  completed: boolean;
}

export interface TaskCreate {
  title: string;
  desc?: string;
  dueDate?: Date | string;
  tags?: string[];
  priority?: string;
}

export interface TaskUpdate {
  _id: string;
  title?: string;
  desc?: string;
  dueDate?: Date | string;
  tags?: string[];
  priority?: string;
  completed?: boolean;
}
