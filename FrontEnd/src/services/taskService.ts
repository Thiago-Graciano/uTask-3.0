import { api } from './api';

export type TaskStatus = 'todo' | 'doing' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
}

export async function getTasks(): Promise<Task[]> {
  const response = await api.get('/tasks');
  return response.data;
}

export async function createTask(title: string, description?: string): Promise<Task> {
  const response = await api.post('/tasks', { title, description });
  return response.data;
}

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<void> {
  await api.patch(`/tasks/${id}`, { status });
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}