import { Briefcase, GraduationCap, User, MoreHorizontal, Edit } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@lib/utils';
import { useTasks } from '@hooks/useTasks';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';

const categories = [
  { id: 'work', label: 'Работа', icon: Briefcase, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
  { id: 'study', label: 'Учёба', icon: GraduationCap, color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
  { id: 'personal', label: 'Личное', icon: User, color: 'text-accent-emerald', bg: 'bg-accent-emerald/10' },
  { id: 'other', label: 'Другое', icon: MoreHorizontal, color: 'text-text-muted', bg: 'bg-border-subtle/50' },
] as const;

type CategoryId = typeof categories[number]['id'];

export function Categories() {
  const { tasks } = useTasks();
  const [editingCategory, setEditingCategory] = useState<CategoryId | null>(null);
  const [editName, setEditName] = useState('');

  const getCategoryStats = (categoryId: CategoryId) => {
    const catTasks = tasks.filter((t) => t.category === categoryId);
    return {
      total: catTasks.length,
      completed: catTasks.filter((t) => t.status === 'done').length,
      inProgress: catTasks.filter((t) => t.status === 'in-progress' || t.status === 'review').length,
    };
  };

  const handleEdit = (cat: CategoryId) => {
    const c = categories.find((x) => x.id === cat);
    if (c) {
      setEditName(c.label);
      setEditingCategory(cat);
    }
  };

  const handleSave = () => {
    setEditingCategory(null);
    setEditName('');
  };

  return (
    <div className="pt-16 lg:pl-64 p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Категории</h1>
        <p className="mt-1 text-text-secondary">Управление категориями задач</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const stats = getCategoryStats(cat.id);
          const isEditing = editingCategory === cat.id;

          return (
            <div key={cat.id} className="card p-5 animate-in">
              {isEditing ? (
                <div className="flex items-center gap-3">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    onBlur={handleSave}
                    autoFocus
                    className="flex-1"
                  />
                  <Button variant="primary" size="sm" onClick={handleSave}>
                    Сохранить
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setEditingCategory(null)}>
                    Отмена
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', cat.bg)}>
                        <cat.icon className={cn('h-5 w-5', cat.color)} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-medium text-text-primary">{cat.label}</h3>
                        <p className="text-xs text-text-muted">{stats.total} задач</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(cat.id)} aria-label={`Редактировать ${cat.label}`}>
                      <Edit className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-lg bg-bg-base">
                      <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
                      <p className="text-xs text-text-muted">Всего</p>
                    </div>
                    <div className="p-3 rounded-lg bg-bg-base">
                      <p className="text-2xl font-bold text-accent-emerald">{stats.completed}</p>
                      <p className="text-xs text-text-muted">Готово</p>
                    </div>
                    <div className="p-3 rounded-lg bg-bg-base">
                      <p className="text-2xl font-bold text-accent-amber">{stats.inProgress}</p>
                      <p className="text-xs text-text-muted">В процессе</p>
                    </div>
                  </div>

                  {stats.total > 0 && (
                    <div className="mt-4 h-2 bg-bg-base rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-emerald rounded-full transition-all duration-300"
                        style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="card p-5">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Добавить категорию</h3>
        <p className="text-text-muted mb-4">Категории фиксированы в текущей версии. В будущем можно добавить кастомные категории.</p>
      </div>
    </div>
  );
}