import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function delay(ms) {
  try {
    return new Promise((resolve) => setTimeout(resolve, ms)); // eslint-disable-line
  } catch (error) {
    console.log(error);
  }
}