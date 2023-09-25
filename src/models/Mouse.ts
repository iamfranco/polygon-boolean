import { Point } from './Point';

export interface Mouse {
  x: number;
  y: number;
  isClicked: boolean;
  isDraggingAPoint: boolean;
  activePoint: Point | null;
  hasMouseChanged: boolean;
}

export const pointToMouse = (point: Point): Mouse => ({
  x: point.x, 
  y: point.y,
  isClicked: false,
  isDraggingAPoint: false,
  activePoint: null,
  hasMouseChanged: false
})