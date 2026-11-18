import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@lib/utils';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <label className={cn('flex items-center gap-2 cursor-pointer', className)}>
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              'peer h-4 w-4 appearance-none rounded border-2 border-border-default',
              'bg-bg-base text-accent-blue',
              'transition-all duration-150',
              'focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-bg-deep',
              'checked:bg-accent-blue checked:border-accent-blue',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'hover:border-accent-blue/50'
            )}
            aria-describedby={props['aria-describedby']}
            {...props}
          />
          <Check
            className={cn(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'h-3.5 w-3.5 text-white',
              'opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100',
              'transition-all duration-150',
              'pointer-events-none'
            )}
            strokeWidth={3.5}
            aria-hidden="true"
          />
        </div>
        {label && (
          <span className="text-sm text-text-primary select-none">{label}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';