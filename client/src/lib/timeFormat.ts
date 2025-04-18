"use client"

// utils/formatTime.ts
import { format } from 'date-fns';

export function secondsToMinSec(seconds: number): string {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeString = format(date, 'm:ss');
  
  // Split into minutes and seconds
  const [mins, secs] = timeString.split(':');
  
  // Return formatted string
  return `${mins} min ${secs} sec`;
}

export function secondsToMinSecColon(seconds: number): string {
  const date = new Date(0);
  date.setSeconds(seconds);
  return format(date, 'm:ss');
}