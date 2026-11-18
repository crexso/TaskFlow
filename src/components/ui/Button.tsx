import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { forwardRef, isValidElement, cloneElement } from 'react';
import { cn } from '@lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, asChild, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-accent-blue text-white hover:bg-accent-blue/90 active:bg-accent-blue focus-visible:ring-accent-blue',
      secondary: 'bg-bg-elevated text-text-primary border border-border-default hover:bg-bg-hover hover:border-border-strong focus-visible:ring-border-strong',
      ghost: 'bg-transparent text-text-secondary hover:bg-bg-elevated hover:text-text-primary focus-visible:ring-border-strong',
      danger: 'bg-accent-coral/10 text-accent-coral border border-accent-coral/20 hover:bg-accent-coral/20 hover:border-accent-coral/40 focus-visible:ring-accent-coral',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement;
      const childProps = child.props as Record<string, unknown>;
      const mergedProps = {
        ...props,
        ...childProps,
        className: cn(base, variants[variant], sizes[size], className, childProps.className as string),
        disabled: disabled || isLoading,
        ref,
      };
      return cloneElement(child, mergedProps);
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';