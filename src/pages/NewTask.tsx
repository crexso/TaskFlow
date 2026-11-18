import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useState } from 'react';
import { useTasks } from '@hooks/useTasks';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Textarea } from '@components/ui/Textarea';
import { Select } from '@components/ui/Select';
import type { TaskStatus, TaskPriority, TaskCategory } from '@type/task';

// Calculate min date outside of render to avoid impure function warning
const minDate = new Date().toISOString().split('T')[0];

const statusOptions = [
  { value: 'todo', label: 'К выполнению' },
  { value: 'in-progress', label: 'В процессе' },
  { value: 'review', label: 'На проверке' },
  { value: 'done', label: 'Готово' },
] as const;

const priorityOptions = [
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' },
] as const;

const categoryOptions = [
  { value: 'work', label: 'Работа' },
  { value: 'study', label: 'Учёба' },
  { value: 'personal', label: 'Личное' },
  { value: 'other', label: 'Другое' },
] as const;

export function NewTask() {
  const navigate = useNavigate();
  const { addTask } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as TaskStatus,
    priority: 'medium' as TaskPriority,
    category: 'work' as TaskCategory,
    deadline: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Название задачи обязательно';
    if (formData.title.length > 100) newErrors.title = 'Название не должно превышать 100 символов';
    if (formData.description.length > 1000) newErrors.description = 'Описание не должно превышать 1000 символов';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    const { deadline, ...rest } = formData;
    addTask({
      ...rest,
      deadline: deadline || null,
    });
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/tasks');
    }, 300);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="pt-16 pl-64 p-6 max-w-2xl">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6 gap-2">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Назад к задачам
      </Button>

      <div className="card animate-in">
        <div className="p-6 border-b border-border-subtle">
          <h1 className="text-2xl font-semibold text-text-primary">Новая задача</h1>
          <p className="mt-1 text-text-secondary">Заполните поля ниже, чтобы создать задачу</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
          <Input
            label="Название"
            placeholder="Введите название задачи"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            error={errors.title}
            maxLength={100}
            autoFocus
          />

          <Textarea
            label="Описание"
            placeholder="Добавьте описание (необязательно)"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            error={errors.description}
            maxLength={1000}
            rows={4}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Статус"
              options={[...statusOptions] as { value: string; label: string }[]}
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
            />
            <Select
              label="Приоритет"
              options={[...priorityOptions] as { value: string; label: string }[]}
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
            />
          </div>

          <Select
            label="Категория"
            options={[...categoryOptions] as { value: string; label: string }[]}
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
          />

          <Input
            label="Дедлайн"
            type="date"
            value={formData.deadline}
            onChange={(e) => handleChange('deadline', e.target.value)}
            min={minDate}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
            <Button type="button" variant="secondary" onClick={() => navigate(-1)} disabled={isSubmitting}>
              Отмена
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Создать задачу
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}