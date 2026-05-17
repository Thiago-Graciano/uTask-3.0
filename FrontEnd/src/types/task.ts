export type TaskStatus = 'todo' | 'doing' | 'done'

export type MoveDirection = 'forward' | 'backward' | 'reset'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  order: number
  createdAt: string
}