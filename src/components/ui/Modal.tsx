import { Fragment, type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@lib/utils';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, description, children, footer, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <Fragment>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-h-[90vh] overflow-hidden animate-in',
          sizes[size]
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}
      >
        <div className="bg-bg-card border border-border-default rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="flex items-start justify-between p-5 border-b border-border-subtle">
            <div>
              <h2 id="modal-title" className="text-lg font-semibold text-text-primary">
                {title}
              </h2>
              {description && (
                <p id="modal-description" className="mt-1 text-sm text-text-secondary">
                  {description}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Закрыть"
              className="text-text-muted hover:text-text-primary"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-5 overflow-y-auto">{children}</div>
          {footer && (
            <div className="flex items-center justify-end gap-3 p-5 border-t border-border-subtle bg-bg-base/50">
              {footer}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}