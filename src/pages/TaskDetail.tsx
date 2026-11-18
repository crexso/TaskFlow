import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, CheckCircle2, Calendar, Flag, Clock } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@lib/utils';
import { useTasks } from '@hooks/useTasks';
import { formatDate, formatDateTime, getRelativeTime, getStatusLabel, getPriorityLabel, getCategoryLabel, getStatusClass, getPriorityClass, getCategoryClass, isOverdue } from '@lib/utils';
import { Button } from '@components/ui/Button';
import { TaskForm } from '@components/tasks/TaskForm';
import { Modal } from '@components/ui/Modal';

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask } = useTasks();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="pt-16 pl-64 p-6">
        <div className="card p-12 text-center">
          <p className="text-text-muted">Задача не найдена</p>
          <Button variant="primary" asChild className="mt-4">
            <Link to="/tasks">Вернуться к списку</Link>
          </Button>
        </div>
      </div>
    );
  }

  const overdue = isOverdue(task.deadline) && task.status !== 'done';

  const handleDelete = async () => {
    setIsDeleting(true);
    deleteTask(task.id);
    setShowDeleteConfirm(false);
    navigate('/tasks');
  };

  return (
    <div className="pt-16 lg:pl-64 p-6 max-w-3xl">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 gap-2">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Назад
      </Button>

      <div className="card animate-in">
        <div className="p-6 border-b border-border-subtle flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-semibold text-text-primary line-clamp-1">{task.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className={cn(getStatusClass(task.status))}>{getStatusLabel(task.status)}</span>
              <span className={cn(getPriorityClass(task.priority))}>
                <Flag className="h-3 w-3 mr-1" aria-hidden="true" />
                {getPriorityLabel(task.priority)}
              </span>
              <span className={cn(getCategoryClass(task.category))}>{getCategoryLabel(task.category)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="secondary" onClick={() => setShowEditForm(true)}>
              <Edit className="h-4 w-4" aria-hidden="true" />
              Редактировать
            </Button>
            <Button variant="danger" onClick={() => setShowDeleteConfirm(true)}>
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {task.description && (
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-2">Описание</h3>
              <p className="text-text-primary whitespace-pre-wrap">{task.description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border-subtle">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-text-secondary">Информация</h3>
              <dl className="space-y-3 text-sm">
                {task.deadline && (
                  <div className={cn('flex items-center gap-3', overdue && 'text-accent-coral')}>
                    <Calendar className="h-5 w-5 text-text-muted flex-shrink-0" aria-hidden="true" />
                    <div>
                      <dt className="text-text-muted">Дедлайн</dt>
                      <dd className="font-medium">{formatDate(task.deadline)}</dd>
                      {overdue && <dd className="text-xs font-medium">Просрочено</dd>}
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-text-muted flex-shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="text-text-muted">Создана</dt>
                    <dd className="font-medium">{formatDateTime(task.createdAt)}</dd>
                    <dd className="text-xs text-text-muted">{getRelativeTime(task.createdAt)}</dd>
                  </div>
                </div>
                {task.completedAt && (
                  <div className="flex items-center gap-3 text-accent-emerald">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <dt className="text-text-muted">Завершена</dt>
                      <dd className="font-medium">{formatDateTime(task.completedAt)}</dd>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-text-muted flex-shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="text-text-muted">Обновлена</dt>
                    <dd className="font-medium">{formatDateTime(task.updatedAt)}</dd>
                    <dd className="text-xs text-text-muted">{getRelativeTime(task.updatedAt)}</dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <TaskForm
        key={`edit-${task.id}`}
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
        onSubmit={(data) => updateTask({ ...task, ...data })}
        initialData={task}
      />

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Удалить задачу?"
        description="Это действие нельзя отменить. Задача будет удалена навсегда."
        size="sm"
      >
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
            Отмена
          </Button>
          <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
            Удалить
          </Button>
        </div>
      </Modal>
    </div>
  );
}