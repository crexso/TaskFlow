import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';
import { STORAGE_KEY } from '@context/TaskContext.types';
import { validateTask } from '@/pages/Settings';
import '@testing-library/jest-dom';

// Test utilities - App already has all providers and BrowserRouter
const renderWithProviders = (component: React.ReactNode) => {
  return render(component);
};

describe('TaskFlow - Core Validation', () => {
  test('validates correct task structure', () => {
    const validTask = {
      id: 'test-1',
      title: 'Valid Task',
      description: 'Valid Description',
      status: 'todo',
      priority: 'medium',
      category: 'work',
      deadline: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
    };

    expect(validateTask(validTask)).toBe(true);
  });

  test('rejects empty title', () => {
    const invalidTask = {
      id: 'test-1',
      title: '',
      description: 'Test',
      status: 'todo',
      priority: 'medium',
      category: 'work',
      deadline: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
    };

    expect(validateTask(invalidTask)).toBe(false);
  });

  test('rejects title too long', () => {
    const invalidTask = {
      id: 'test-1',
      title: 'a'.repeat(101),
      description: 'Test',
      status: 'todo',
      priority: 'medium',
      category: 'work',
      deadline: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
    };

    expect(validateTask(invalidTask)).toBe(false);
  });

  test('rejects description too long', () => {
    const invalidTask = {
      id: 'test-1',
      title: 'Test',
      description: 'a'.repeat(1001),
      status: 'todo',
      priority: 'medium',
      category: 'work',
      deadline: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
    };

    expect(validateTask(invalidTask)).toBe(false);
  });

  test('rejects invalid status', () => {
    const invalidTask = {
      id: 'test-1',
      title: 'Test',
      description: 'Test',
      status: 'invalid-status',
      priority: 'medium',
      category: 'work',
      deadline: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
    };

    expect(validateTask(invalidTask)).toBe(false);
  });

  test('rejects invalid priority', () => {
    const invalidTask = {
      id: 'test-1',
      title: 'Test',
      description: 'Test',
      status: 'todo',
      priority: 'invalid-priority',
      category: 'work',
      deadline: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
    };

    expect(validateTask(invalidTask)).toBe(false);
  });

  test('rejects invalid category', () => {
    const invalidTask = {
      id: 'test-1',
      title: 'Test',
      description: 'Test',
      status: 'todo',
      priority: 'medium',
      category: 'invalid-category',
      deadline: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
    };

    expect(validateTask(invalidTask)).toBe(false);
  });

  test('rejects missing required fields', () => {
    const missingFields = {
      id: 'test-1',
      title: 'Test',
    };

    expect(validateTask(missingFields)).toBe(false);
  });

  test('rejects invalid date format', () => {
    const invalidTask = {
      id: 'test-1',
      title: 'Test',
      description: 'Test',
      status: 'todo',
      priority: 'medium',
      category: 'work',
      deadline: 'invalid-date',
      createdAt: 'not-a-date',
      updatedAt: new Date().toISOString(),
      completedAt: null,
    };

    expect(validateTask(invalidTask)).toBe(false);
  });

  test('accepts valid status values', () => {
    const statuses = ['todo', 'in-progress', 'review', 'done'];
    statuses.forEach(status => {
      const task = {
        id: 'test-1',
        title: 'Test',
        description: 'Test',
        status,
        priority: 'medium',
        category: 'work',
        deadline: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
      };
      expect(validateTask(task)).toBe(true);
    });
  });

  test('accepts valid priority values', () => {
    const priorities = ['low', 'medium', 'high'];
    priorities.forEach(priority => {
      const task = {
        id: 'test-1',
        title: 'Test',
        description: 'Test',
        status: 'todo',
        priority,
        category: 'work',
        deadline: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
      };
      expect(validateTask(task)).toBe(true);
    });
  });

  test('accepts valid category values', () => {
    const categories = ['work', 'study', 'personal', 'other'];
    categories.forEach(category => {
      const task = {
        id: 'test-1',
        title: 'Test',
        description: 'Test',
        status: 'todo',
        priority: 'medium',
        category,
        deadline: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
      };
      expect(validateTask(task)).toBe(true);
    });
  });

  test('accepts null deadline', () => {
    const task = {
      id: 'test-1',
      title: 'Test',
      description: 'Test',
      status: 'todo',
      priority: 'medium',
      category: 'work',
      deadline: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
    };
    expect(validateTask(task)).toBe(true);
  });

  test('accepts valid deadline date', () => {
    const task = {
      id: 'test-1',
      title: 'Test',
      description: 'Test',
      status: 'todo',
      priority: 'medium',
      category: 'work',
      deadline: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
    };
    expect(validateTask(task)).toBe(true);
  });

  test('accepts null completedAt', () => {
    const task = {
      id: 'test-1',
      title: 'Test',
      description: 'Test',
      status: 'todo',
      priority: 'medium',
      category: 'work',
      deadline: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
    };
    expect(validateTask(task)).toBe(true);
  });

  test('accepts valid completedAt date', () => {
    const task = {
      id: 'test-1',
      title: 'Test',
      description: 'Test',
      status: 'done',
      priority: 'medium',
      category: 'work',
      deadline: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };
    expect(validateTask(task)).toBe(true);
  });
});

describe('TaskFlow - Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('tasks persist in localStorage', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    // Navigate to new task page - use the sidebar button
    const newTaskButtons = screen.getAllByText('Новая задача');
    await user.click(newTaskButtons[0]);

    // Fill in task form
    await user.type(screen.getByLabelText('Название'), 'Persistent Task');
    await user.click(screen.getByText('Создать задачу'));

    // Check localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).toBeTruthy();

    const tasks = JSON.parse(stored!);
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Persistent Task');
  });

  test('tasks load from localStorage on app init', async () => {
    // Pre-populate localStorage
    const existingTask = {
      id: 'pre-existing',
      title: 'Pre-existing Task',
      description: 'Loaded from storage',
      status: 'todo',
      priority: 'medium',
      category: 'work',
      deadline: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([existingTask]));

    const user = userEvent.setup();
    renderWithProviders(<App />);

    // Navigate to tasks page to see the task
    const tasksLinks = screen.getAllByText('Задачи');
    await user.click(tasksLinks[0]);

    // Task should appear without creating it
    await waitFor(() => {
      expect(screen.getByText('Pre-existing Task')).toBeInTheDocument();
    });
  });
});

describe('TaskFlow - Settings', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('theme toggle works', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const settingsButtons = screen.getAllByText('Настройки');
    await user.click(settingsButtons[0]);
    await user.click(screen.getByText('Внешний вид'));

    // Toggle theme
    const lightButton = screen.getByText('Светлая');
    await user.click(lightButton);

    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  test('language change persists', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const settingsButtons = screen.getAllByText('Настройки');
    await user.click(settingsButtons[0]);
    // Find the language select by its value or role
    const selects = screen.getAllByRole('combobox');
    // The language select is the first one in the general tab
    await user.selectOptions(selects[0], 'en');

    expect(localStorage.getItem('taskflow_language')).toBe('en');
  });

  test('timezone change persists', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const settingsButtons = screen.getAllByText('Настройки');
    await user.click(settingsButtons[0]);
    const selects = screen.getAllByRole('combobox');
    // The timezone select is the second one in the general tab
    await user.selectOptions(selects[1], 'Europe/Kyiv');

    expect(localStorage.getItem('taskflow_timezone')).toBe('Europe/Kyiv');
  });
});

describe('TaskFlow - Basic Navigation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('app renders without errors', async () => {
    renderWithProviders(<App />);
    expect(screen.getByText('TaskFlow')).toBeInTheDocument();
  });

  test('navigates to tasks page', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    // Click tasks link in sidebar (first one)
    const tasksLinks = screen.getAllByText('Задачи');
    await user.click(tasksLinks[0]);

    // Should show tasks page header (the h1 element, not the sidebar link)
    // The sidebar link has aria-current="page" when active
    const pageHeader = screen.getByRole('heading', { name: 'Задачи' });
    expect(pageHeader).toBeInTheDocument();
  });

  test('navigates to new task page', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const newTaskButtons = screen.getAllByText('Новая задача');
    await user.click(newTaskButtons[0]);

    // Should show new task form
    expect(screen.getByLabelText('Название')).toBeInTheDocument();
  });
});

describe('TaskFlow - Utility Functions', () => {
  test('formatDate works correctly', async () => {
    const { formatDate } = await import('@/lib/utils');
    const date = '2024-01-15T10:30:00.000Z';
    const result = formatDate(date);
    // Should return Russian format like "15 янв. 2024"
    expect(result).toContain('15');
    expect(result).toContain('2024');
  });

  test('formatDate handles null', async () => {
    const { formatDate } = await import('@/lib/utils');
    const result = formatDate(null);
    expect(result).toBe('—');
  });

  test('formatDateTime works correctly', async () => {
    const { formatDateTime } = await import('@/lib/utils');
    const date = '2024-01-15T10:30:00.000Z';
    const result = formatDateTime(date);
    // Should return Russian format like "15 янв. 2024, 10:30"
    expect(result).toContain('15');
    expect(result).toContain('2024');
  });

  test('getRelativeTime works correctly', async () => {
    const { getRelativeTime } = await import('@/lib/utils');
    const now = new Date();
    const past = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago
    const result = getRelativeTime(past.toISOString());
    expect(result).toContain('мин');
  });

  test('isOverdue works correctly', async () => {
    const { isOverdue } = await import('@/lib/utils');
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 day later

    // isOverdue expects date in YYYY-MM-DD format
    // A task is overdue if its deadline date (end of day) has passed
    const pastDate = yesterday.toISOString().split('T')[0];
    const futureDate = tomorrow.toISOString().split('T')[0];

    expect(isOverdue(pastDate)).toBe(true);
    expect(isOverdue(futureDate)).toBe(false);
    expect(isOverdue(null)).toBe(false);
  });

  test('getStatusLabel works correctly', async () => {
    const { getStatusLabel } = await import('@/lib/utils');
    expect(getStatusLabel('todo')).toBe('К выполнению');
    expect(getStatusLabel('in-progress')).toBe('В процессе');
    expect(getStatusLabel('review')).toBe('На проверке');
    expect(getStatusLabel('done')).toBe('Готово');
    expect(getStatusLabel('unknown')).toBe('unknown');
  });

  test('getPriorityLabel works correctly', async () => {
    const { getPriorityLabel } = await import('@/lib/utils');
    expect(getPriorityLabel('low')).toBe('Низкий');
    expect(getPriorityLabel('medium')).toBe('Средний');
    expect(getPriorityLabel('high')).toBe('Высокий');
    expect(getPriorityLabel('unknown')).toBe('unknown');
  });

  test('getCategoryLabel works correctly', async () => {
    const { getCategoryLabel } = await import('@/lib/utils');
    expect(getCategoryLabel('work')).toBe('Работа');
    expect(getCategoryLabel('study')).toBe('Учёба');
    expect(getCategoryLabel('personal')).toBe('Личное');
    expect(getCategoryLabel('other')).toBe('Другое');
    expect(getCategoryLabel('unknown')).toBe('unknown');
  });
});