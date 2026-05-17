export type Id = string;

export type Column = {
  id: 'todo' | 'doing' | 'done';
  title: string;
};

export type Task = {
  id: Id;
  title: string;
  description?: string;
  status: 'todo' | 'doing' | 'done';
  createdAt?: string;
};