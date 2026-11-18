import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, X, Search } from 'lucide-react';
import { useTasks } from '@hooks/useTasks';
import { TaskCard } from '@components/tasks/TaskCard';
import { TaskForm } from '@components/tasks/TaskForm';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Select } from '@components/ui/Select';
import type { TaskStatus, TaskPriority, TaskCategory } from '@type/task';

export function Tasks() {
  const { tasks, filteredTasks, filters, setFilters, resetFilters, deleteTask, toggleTask } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<typeof tasks[0] | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'Все статусы' },
    { value: 'todo', label: 'К выполнению' },
    { value: 'in-progress', label: 'В процессе' },
    { value: 'review', label: 'На проверке' },
    { value: 'done', label: 'Готово' },
  ];

  const priorityOptions = [
    { value: 'all', label: 'Все приоритеты' },
    { value: 'low', label: 'Низкий' },
    { value: 'medium', label: 'Средний' },
    { value: 'high', label: 'Высокий' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'Все категории' },
    { value: 'work', label: 'Работа' },
    { value: 'study', label: 'Учёба' },
    { value: 'personal', label: 'Личное' },
    { value: 'other', label: 'Другое' },
  ];

  const hasActiveFilters = filters.status !== 'all' || filters.category !== 'all' || filters.priority !== 'all' || filters.search;

  const handleEdit = (task: typeof tasks[0]) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleSubmit = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="pt-16 pl-64 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Задачи</h1>
          <p className="mt-1 text-text-secondary">{filteredTasks.length} из {tasks.length} задач</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="gap-2">
            <Filter className="h-4 w-4" aria-hidden="true" />
            Фильтры
            {hasActiveFilters && (
              <span className="w-5 h-5 rounded-full bg-accent-blue/20 text-accent-blue text-xs flex items-center justify-center">
                {!filters.search && (filters.status !== 'all' || filters.category !== 'all' || filters.priority !== 'all') ? '●' : ''}
              </span>
            )}
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-2 text-text-muted hover:text-accent-coral">
              <X className="h-4 w-4" aria-hidden="true" />
              Сбросить
            </Button>
          )}
          <Button variant="primary" asChild>
            <Link to="/tasks/new">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Новая задача
            </Link>
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="card p-4 animate-in space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Поиск по названию или описанию..."
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                className="max-w-xs"
              />
            </div>
            <Select
              label="Статус"
              options={statusOptions}
              value={filters.status}
              onChange={(e) => setFilters({ status: e.target.value as TaskStatus | 'all' })}
              className="w-48"
            />
            <Select
              label="Категория"
              options={categoryOptions}
              value={filters.category}
              onChange={(e) => setFilters({ category: e.target.value as TaskCategory | 'all' })}
              className="w-48"
            />
            <Select
              label="Приоритет"
              options={priorityOptions}
              value={filters.priority}
              onChange={(e) => setFilters({ priority: e.target.value as TaskPriority | 'all' })}
              className="w-48"
            />
          </div>
        </div>
      )}

      <div className="card animate-in">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center">
            <Search className="h-12 w-12 mx-auto text-text-muted mb-4" aria-hidden="true" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              {hasActiveFilters ? 'Ничего не найдено' : 'Задач пока нет'}
            </h3>
            <p className="text-text-muted mb-6">
              {hasActiveFilters
                ? 'Попробуйте изменить фильтры или поисковый запрос'
                : 'Создайте свою первую задачу, чтобы начать'}
            </p>
            {!hasActiveFilters && (
              <Button variant="primary" asChild>
                <Link to="/tasks/new">
                  <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                  Создать задачу
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-border-subtle">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={deleteTask}
                onToggle={toggleTask}
              />
            ))}
          </div>
        )}
      </div>

      <TaskForm
        key={editingTask ? `edit-${editingTask.id}` : 'new'}
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditingTask(null); }}
        onSubmit={handleSubmit}
        initialData={editingTask}
      />
    </div>
  );
}