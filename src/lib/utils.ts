import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatNumberWithDots(num: number): string {
  return new Intl.NumberFormat("es-AR").format(num);
}