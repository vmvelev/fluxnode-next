import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Rounds a number to two decimal places
 * @param amount The number to round
 * @returns The rounded number
 * @throws Error if the input is not a number
 */
export function calculateFloatNumber(amount: number): number {
  if (Number.isNaN(amount)) {
    throw new Error('Invalid amount type')
  }
  return Math.round(amount * 100) / 100
}

/**
 * Formats a number with thousands separators
 * @param amount The number to format
 * @returns Formatted string with thousands separators
 */
export function formatThousandsSeparator(amount: number): string {
  if (Number.isNaN(amount)) {
    throw new Error('Invalid amount type')
  }
  return amount.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

/**
 * Formats a number to a compact representation (e.g., 1.2k, 1.2M)
 * @param amount The number to format
 * @returns Compact string representation of the number
 */
export function formatCompact(amount: number): string {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(amount)
}

/**
 * Formats a number as a percentage
 * @param value The number to format as percentage
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${(value).toFixed(decimals)}%`
}

/**
 * Ensures a number is within a given range
 * @param value The number to clamp
 * @param min Minimum value
 * @param max Maximum value
 * @returns The clamped number
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Checks if a value is a valid number
 * @param value The value to check
 * @returns True if the value is a valid number
 */
export function isValidNumber(value: any): boolean {
  return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value)
}