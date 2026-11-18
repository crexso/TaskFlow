import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow, isPast, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { toZonedTime, format as formatTz } from 'date-fns-tz';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getTimezone(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('taskflow_timezone');
    if (saved && saved !== 'auto') return saved;
    // auto: use browser's timezone
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return 'UTC';
}

function getTimezoneForDate(_dateString: string): string {
  // For parsing ISO strings, we need to handle timezone properly
  // The stored dates are in ISO format (UTC), so we convert to the user's timezone for display
  return getTimezone();
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return '—';
  try {
    const tz = getTimezoneForDate(dateString);
    const date = parseISO(dateString);
    const zonedDate = toZonedTime(date, tz);
    return formatTz(zonedDate, 'd MMM yyyy', { timeZone: tz, locale: ru });
  } catch {
    return '—';
  }
}

export function formatDateTime(dateString: string): string {
  try {
    const tz = getTimezoneForDate(dateString);
    const date = parseISO(dateString);
    const zonedDate = toZonedTime(date, tz);
    return formatTz(zonedDate, 'd MMM yyyy, HH:mm', { timeZone: tz, locale: ru });
  } catch {
    return dateString;
  }
}

export function getRelativeTime(dateString: string): string {
  try {
    const tz = getTimezoneForDate(dateString);
    const date = parseISO(dateString);
    const zonedDate = toZonedTime(date, tz);
    return formatDistanceToNow(zonedDate, { addSuffix: true, locale: ru });
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