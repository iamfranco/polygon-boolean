import { Point } from './Point';

export interface Mouse {
  x: number;
  y: number;
  isLeftClicked: boolean;
  isRightClicked: boolean;
  isDraggingAPoint: boolean;
  activePoint: Point | null;
  hasMouseChanged: boolean;
}

export const pointToMouse = (point: Point): Mouse => ({
  x: point.x, 
  y: point.y,
  isLeftClicked: false,
  isRightClicked: false,
  isDraggingAPoint: false,
  activePoint: null,
  hasMouseChanged: false
})