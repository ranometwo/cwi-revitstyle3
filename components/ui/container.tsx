import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'small' | 'large';
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto px-4',
          {
            'max-w-7xl': size === 'default',
            'max-w-5xl': size === 'small',
            'max-w-screen-2xl': size === 'large',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';

export { Container };