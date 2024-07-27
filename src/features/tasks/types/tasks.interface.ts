export type Priority = "low" | "medium" | "high" | "urgent"

export interface Comment {
  id: string
  userId: string
  taskId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  userId: string
  title: string
  comments: Comment[]
  description?: string
  dueDate?: Date
  priority: Priority
  //   assignee?: string
  tags: string[]
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TaskCreate {
  title: string
  description?: string
  dueDate?: Date
  priority?: Priority
  //   assignee?: string
  tags?: string[]
}

export interface Tag {
  id: string
  userId: string
  name: string
  color: string
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  password?: string // Sólo para la creación del usuario, no para almacenar
  createdAt: Date
  updatedAt: Date
}
