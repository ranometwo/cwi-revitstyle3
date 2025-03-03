import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using clsx and tailwind-merge
 * This allows for conditional and dynamic class names with proper Tailwind CSS handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

/**
 * Format a number with commas
 */
export function formatNumber(value: number): string {
  return value.toLocaleString();
}

/**
 * Calculate time saved based on wall count
 */
export function calculateTimeSaved(wallCount: number, secondsPerWall: number = 5): number {
  const savedSeconds = wallCount * secondsPerWall;
  return savedSeconds / 60; // Convert to minutes
}