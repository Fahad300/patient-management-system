import dayjs from 'dayjs';

/**
 * Format a date string using dayjs
 * @param date - Date string to format
 * @param format - Format string (default: 'YYYY-MM-DD')
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date, format: string = 'YYYY-MM-DD'): string => {
  return dayjs(date).format(format);
};

/**
 * Format a number as currency (USD)
 * @param amount - Number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Check if a date is in the past
 * @param date - Date to check
 * @returns boolean
 */
export const isPastDate = (date: string | Date): boolean => {
  return dayjs(date).isBefore(dayjs(), 'day');
};

/**
 * Get time slots for a given date
 * @param date - Date to get time slots for
 * @param duration - Duration in minutes (default: 30)
 * @returns Array of time slots
 */
export const getTimeSlots = (date: string | Date, duration: number = 30) => {
  const startTime = dayjs(date).set('hour', 9).set('minute', 0); // Start at 9 AM
  const endTime = dayjs(date).set('hour', 17).set('minute', 0); // End at 5 PM
  const slots = [];

  let currentSlot = startTime;
  while (currentSlot.isBefore(endTime)) {
    slots.push({
      start: currentSlot.format('HH:mm'),
      end: currentSlot.add(duration, 'minute').format('HH:mm'),
    });
    currentSlot = currentSlot.add(duration, 'minute');
  }

  return slots;
};

/**
 * Check if two time ranges overlap
 * @param start1 - Start time of first range
 * @param end1 - End time of first range
 * @param start2 - Start time of second range
 * @param end2 - End time of second range
 * @returns boolean
 */
export const doTimesOverlap = (
  start1: string | Date,
  end1: string | Date,
  start2: string | Date,
  end2: string | Date
): boolean => {
  const s1 = dayjs(start1);
  const e1 = dayjs(end1);
  const s2 = dayjs(start2);
  const e2 = dayjs(end2);

  return (s1.isBefore(e2) && e1.isAfter(s2));
};

/**
 * Get the week number of a date
 * @param date - Date to get week number for
 * @returns number
 */
export const getWeekNumber = (date: string | Date): number => {
  return dayjs(date).week();
};

/**
 * Get the start and end of a week
 * @param date - Any date in the week
 * @returns Object with start and end dates
 */
export const getWeekRange = (date: string | Date) => {
  const start = dayjs(date).startOf('week');
  const end = dayjs(date).endOf('week');
  return {
    start: start.format('YYYY-MM-DD'),
    end: end.format('YYYY-MM-DD'),
  };
};

/**
 * Format a duration in minutes to hours and minutes
 * @param minutes - Duration in minutes
 * @returns Formatted duration string
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

/**
 * Get relative time from now
 * @param date - Date to compare
 * @returns Relative time string
 */
export const getRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns boolean
 */
export const isToday = (date: string | Date): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
}; 