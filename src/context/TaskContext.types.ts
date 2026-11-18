import { createContext } from 'react';
import type { Task, TaskFilters, TaskStatus } from '@type/task';

const STORAGE_KEY = 'taskflow_tasks';

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const initialFilters: TaskFilters = {
  status: 'all',
  category: 'all',
  priority: 'all',
  search: '',
};

type TaskAction =
  | { type: 'LOAD_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<TaskFilters> }
  | { type: 'RESET_FILTERS' };

interface TaskState {
  tasks: Task[];
  filters: TaskFilters;
  isLoading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  filters: initialFilters,
  isLoading: true,
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'LOAD_TASKS':
      return { ...state, tasks: action.payload, isLoading: false };

    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.payload.id ? action.payload : t)),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          if (t.id !== action.payload) return t;
          const newStatus: TaskStatus = t.status === 'done' ? 'todo' : 'done';
          return {
            ...t,
            status: newStatus,
            completedAt: newStatus === 'done' ? new Date().toISOString() : null,
            updatedAt: new Date().toISOString(),
          };
        }),
      };

    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case 'RESET_FILTERS':
      return { ...state, filters: initialFilters };

    default:
      return state;
  }
}

export interface TaskContextValue extends TaskState {
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completedAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilters: (filters: Partial<TaskFilters>) => void;
  resetFilters: () => void;
  filteredTasks: Task[];
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    completionRate: number;
  };
  activityData: { date: string; created: number; completed: number }[];
}

export const TaskContext = createContext<TaskContextValue | null>(null);

export { STORAGE_KEY, generateId, initialFilters, initialState, taskReducer };