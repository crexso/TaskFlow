import { MoreVertical, Edit, Trash2, CheckCircle2, Clock, Calendar, Flag } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@lib/utils';
import { formatDate, getRelativeTime, getStatusLabel, getPriorityLabel, getCategoryLabel, getStatusClass, getPriorityClass, getCategoryClass, isOverdue } from '@lib/utils';
import type { Task } from '@type/task';
import { Button } from '@components/ui/Button';
import { Modal } from '@components/ui/Modal';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete, onToggle }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const overdue = isOverdue(task.deadline) && task.status !== 'done';

  return (
    <article className={cn('card relative group animate-in', task.status === 'done' && 'opacity-60')}>
      <div className="flex items-start gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggle(task.id)}
          aria-label={task.status === 'done' ? 'Отменить выполнение' : 'Отметить выполненной'}
          className="mt-0.5 flex-shrink-0 transition-colors"
        >
          <CheckCircle2
            className={cn(
              'h-5 w-5 transition-all duration-200',
              task.status === 'done' ? 'text-accent-emerald fill-current' : 'text-text-muted'
            )}
          />
        </Button>

        <div className="flex-1 min-w-0">
          <NavLink
            to={`/tasks/${task.id}`}
            className="block text-text-primary hover:text-accent-blue transition-colors font-medium text-base line-clamp-1 pr-8"
          >
            {task.title}
          </NavLink>

          {task.description && (
            <p className="mt-1.5 text-sm text-text-secondary line-clamp-2">{task.description}</p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={cn(getStatusClass(task.status))}>{getStatusLabel(task.status)}</span>
            <span className={cn(getPriorityClass(task.priority))}>
              <Flag className="h-3 w-3 mr-1" aria-hidden="true" />
              {getPriorityLabel(task.priority)}
            </span>
            <span className={cn(getCategoryClass(task.category))}>
              {getCategoryLabel(task.category)}
            </span>
          </div>

          {(task.deadline || task.createdAt) && (
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-text-muted">
              {task.deadline && (
                <span className={cn('flex items-center gap-1.5', overdue && 'text-accent-coral')}>
                  <Calendar className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                  {formatDate(task.deadline)}
                  {overdue && <span className="font-medium">просрочено</span>}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                Создано {getRelativeTime(task.createdAt)}
              </span>
            </div>
          )}
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Дополнительные действия"
            aria-expanded={showMenu}
            className="text-text-muted hover:text-text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-full mt-1.5 w-40 bg-bg-card border border-border-default rounded-lg shadow-lg py-1.5 z-50 animate-in">
                <button
                  onClick={() => { onEdit(task); setShowMenu(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-bg-elevated flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" aria-hidden="true" />
                  Редактировать
                </button>
                <button
                  onClick={() => { setShowDeleteConfirm(true); setShowMenu(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-accent-coral hover:bg-bg-elevated flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Удалить
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Удалить задачу?"
        description="Это действие нельзя отменить. Задача будет удалена навсегда."
        size="sm"
      >
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Отмена
          </Button>
          <Button variant="danger" onClick={() => { onDelete(task.id); setShowDeleteConfirm(false); }}>
            Удалить
          </Button>
        </div>
      </Modal>
    </article>
  );
}