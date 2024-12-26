import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {Camera} from "@/types/canvas";

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

export const pointerEventToCanvasPoint = (e: PointerEvent, camera: Camera) => {
  return {
    x: Math.round(e.clientX - camera.x),
    y: Math.round(e.clientY - camera.y),
  }
}