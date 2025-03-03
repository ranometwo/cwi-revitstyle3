import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50',
          {
            'bg-primary-600 text-white hover:bg-primary-700 shadow hover:shadow-md': variant === 'primary',
            'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 shadow-sm hover:shadow': variant === 'secondary',
            'border border-primary-600 bg-transparent text-primary-600 hover:bg-primary-50': variant === 'outline',
            'bg-transparent text-neutral-700 hover:bg-neutral-100': variant === 'ghost',
            'bg-accent-600 text-white hover:bg-accent-700 shadow hover:shadow-md': variant === 'accent',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };