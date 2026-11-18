import { useContext } from 'react';
import { TaskContext } from '@context/TaskContext.types';
import type { TaskContextValue } from '@context/TaskContext.types';

export function useTasks(): TaskContextValue {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
}