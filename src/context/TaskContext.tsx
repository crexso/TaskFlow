import { useReducer, useEffect, type ReactNode } from 'react';
import { TaskContext, STORAGE_KEY, generateId, initialState, taskReducer } from './TaskContext.types';
import type { TaskContextValue } from './TaskContext.types';
import { getStatusLabel, getPriorityLabel, getCategoryLabel } from '@lib/utils';

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(stored) });
      } else {
        dispatch({ type: 'LOAD_TASKS', payload: [] });
      }
    } catch {
      dispatch({ type: 'LOAD_TASKS', payload: [] });
    }
  }, []);

  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    }
  }, [state.tasks, state.isLoading]);

  const addTask = (task: Omit<TaskContextValue['tasks'][0], 'id' | 'createdAt' | 'updatedAt' | 'completedAt'>) => {
    const now = new Date().toISOString();
    const newTask: TaskContextValue['tasks'][0] = {
      ...task,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
      completedAt: task.status === 'done' ? now : null,
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (task: TaskContextValue['tasks'][0]) => {
    dispatch({
      type: 'UPDATE_TASK',
      payload: { ...task, updatedAt: new Date().toISOString() },
    });
  };

  const deleteTask = (id: string) => dispatch({ type: 'DELETE_TASK', payload: id });
  const toggleTask = (id: string) => dispatch({ type: 'TOGGLE_TASK', payload: id });
  const setFilters = (filters: Partial<TaskContextValue['filters']>) => dispatch({ type: 'SET_FILTERS', payload: filters });
  const resetFilters = () => dispatch({ type: 'RESET_FILTERS' });

  const filteredTasks = state.tasks.filter((task) => {
    if (state.filters.status !== 'all' && task.status !== state.filters.status) return false;
    if (state.filters.category !== 'all' && task.category !== state.filters.category) return false;
    if (state.filters.priority !== 'all' && task.priority !== state.filters.priority) return false;
    if (state.filters.search) {
      const search = state.filters.search.toLowerCase();
      const statusLabel = getStatusLabel(task.status).toLowerCase();
      const priorityLabel = getPriorityLabel(task.priority).toLowerCase();
      const categoryLabel = getCategoryLabel(task.category).toLowerCase();
      if (
        !task.title.toLowerCase().includes(search) &&
        !task.description.toLowerCase().includes(search) &&
        !statusLabel.includes(search) &&
        !priorityLabel.includes(search) &&
        !categoryLabel.includes(search)
      ) {
        return false;
      }
    }
    return true;
  });

  const stats = {
    total: state.tasks.length,
    completed: state.tasks.filter((t) => t.status === 'done').length,
    inProgress: state.tasks.filter((t) => t.status === 'in-progress' || t.status === 'review').length,
    completionRate: state.tasks.length
      ? Math.round((state.tasks.filter((t) => t.status === 'done').length / state.tasks.length) * 100)
      : 0,
  };

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const activityData = last7Days.map((date) => ({
    date,
    created: state.tasks.filter((t) => t.createdAt.startsWith(date)).length,
    completed: state.tasks.filter((t) => t.completedAt?.startsWith(date)).length,
  }));

  return (
    <TaskContext.Provider
      value={{
        ...state,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        setFilters,
        resetFilters,
        filteredTasks,
        stats,
        activityData,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}