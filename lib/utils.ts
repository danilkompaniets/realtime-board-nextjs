import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const colors = [
  "#007BFF",
  "#6C757D",
  "#28A745",
  "#DC3545",
  "#FFC107",
  "#17A2B8",
  "#343A40",
];


export const connectionIdToColor = (connectionId: number): string => {
  return colors[connectionId % colors.length]
}