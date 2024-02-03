import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getHumanFriendlyDate(date: Date) {
  const _date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  return _date
}
