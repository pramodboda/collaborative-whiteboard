// drawing.ts

export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  id: string;
  type: "stroke";
  points: Point[];
  color: string;
  size: number;
}

export interface RectangleShape {
  id: string;
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  size: number;
}

export interface CircleShape {
  id: string;
  type: "circle";
  x: number;
  y: number;
  radius: number;
  color: string;
  size: number;
}

export interface LineShape {
  id: string;
  type: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  size: number;
}

export type BoardElement = Stroke | RectangleShape | CircleShape | LineShape;
