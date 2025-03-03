import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: ReactNode;
}

export function SectionHeading({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  children,
}: SectionHeadingProps) {
  return (
    <motion.div 
      className={cn("text-center mb-16", className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={cn("text-3xl md:text-4xl font-bold text-primary-700 mb-4", titleClassName)}>
        {title}
      </h2>
      {description && (
        <p className={cn("text-lg text-neutral-600 max-w-3xl mx-auto", descriptionClassName)}>
          {description}
        </p>
      )}
      {children}
    </motion.div>
  );
}