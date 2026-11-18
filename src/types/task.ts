export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskCategory = 'work' | 'study' | 'personal' | 'other';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  deadline: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export interface TaskFilters {
  status: TaskStatus | 'all';
  category: TaskCategory | 'all';
  priority: TaskPriority | 'all';
  search: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  completionRate: number;
}

export interface ActivityData {
  date: string;
  created: number;
  completed: number;
}