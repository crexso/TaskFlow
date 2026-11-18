import { useState } from 'react';
import type { Task, TaskStatus, TaskPriority, TaskCategory } from '@type/task';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Textarea } from '@components/ui/Textarea';
import { Select } from '@components/ui/Select';
import { Modal } from '@components/ui/Modal';

// Calculate min date outside of render to avoid impure function warning
const minDate = new Date().toISOString().split('T')[0];

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completedAt'>) => void;
  initialData?: Task | null;
  isLoading?: boolean;
}

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

export function TaskForm({ isOpen, onClose, onSubmit, initialData, isLoading }: TaskFormProps) {
  // Derive initial form data from props
  const getInitialFormData = () => {
    if (initialData) {
      return {
        title: initialData.title,
        description: initialData.description,
        status: initialData.status as TaskStatus,
        priority: initialData.priority as TaskPriority,
        category: initialData.category as TaskCategory,
        deadline: initialData.deadline ? initialData.deadline.split('T')[0] : '',
      };
    }
    return {
      title: '',
      description: '',
      status: 'todo' as TaskStatus,
      priority: 'medium' as TaskPriority,
      category: 'work' as TaskCategory,
      deadline: '',
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.title.trim()) newErrors.title = 'Название задачи обязательно';
    if (formData.title.length > 100) newErrors.title = 'Название не должно превышать 100 символов';
    if (formData.description.length > 1000) newErrors.description = 'Описание не должно превышать 1000 символов';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const { deadline, ...rest } = formData;
    onSubmit({
      ...rest,
      deadline: deadline || null,
    });
    onClose();
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Редактировать задачу' : 'Новая задача'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
            onChange={(e) => handleChange('status', e.target.value as TaskStatus)}
          />
          <Select
            label="Приоритет"
            options={[...priorityOptions] as { value: string; label: string }[]}
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value as TaskPriority)}
          />
        </div>

        <Select
          label="Категория"
          options={[...categoryOptions] as { value: string; label: string }[]}
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value as TaskCategory)}
        />

        <Input
          label="Дедлайн"
          type="date"
          value={formData.deadline}
          onChange={(e) => handleChange('deadline', e.target.value)}
          min={minDate}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
            Отмена
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            {initialData ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}