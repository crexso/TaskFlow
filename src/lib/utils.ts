import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, isPast, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return '—';
  try {
    return format(parseISO(dateString), 'd MMM yyyy', { locale: ru });
  } catch {
    return '—';
  }
}

export function formatDateTime(dateString: string): string {
  try {
    return format(parseISO(dateString), 'd MMM yyyy, HH:mm', { locale: ru });
  } catch {
    return dateString;
  }
}

export function getRelativeTime(dateString: string): string {
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true, locale: ru });
  } catch {
    return '';
  }
}

export function isOverdue(dateString: string | null): boolean {
  if (!dateString) return false;
  return isPast(parseISO(dateString));
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    todo: 'К выполнению',
    'in-progress': 'В процессе',
    review: 'На проверке',
    done: 'Готово',
  };
  return labels[status] ?? status;
}

export function getPriorityLabel(priority: string): string {
  const labels: Record<string, string> = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
  };
  return labels[priority] ?? priority;
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    work: 'Работа',
    study: 'Учёба',
    personal: 'Личное',
    other: 'Другое',
  };
  return labels[category] ?? category;
}

export function getStatusClass(status: string): string {
  const classes: Record<string, string> = {
    todo: 'badge-todo',
    'in-progress': 'badge-in-progress',
    review: 'badge-review',
    done: 'badge-done',
  };
  return classes[status] ?? 'badge-todo';
}

export function getPriorityClass(priority: string): string {
  const classes: Record<string, string> = {
    low: 'priority-low',
    medium: 'priority-medium',
    high: 'priority-high',
  };
  return classes[priority] ?? 'priority-low';
}

export function getCategoryClass(category: string): string {
  const classes: Record<string, string> = {
    work: 'category-work',
    study: 'category-study',
    personal: 'category-personal',
    other: 'category-other',
  };
  return classes[category] ?? 'category-other';
}