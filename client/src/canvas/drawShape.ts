import type { CircleShape, LineShape, RectangleShape } from "../types/drawing";

export const drawRectangle = (
  ctx: CanvasRenderingContext2D,
  shape: RectangleShape,
) => {
  ctx.strokeStyle = shape.color;
  ctx.lineWidth = shape.size;

  ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
};

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  shape: CircleShape,
) => {
  ctx.beginPath();

  ctx.strokeStyle = shape.color;
  ctx.lineWidth = shape.size;

  ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);

  ctx.stroke();
};

export const drawLine = (ctx: CanvasRenderingContext2D, shape: LineShape) => {
  ctx.beginPath();

  ctx.strokeStyle = shape.color;
  ctx.lineWidth = shape.size;

  ctx.moveTo(shape.x1, shape.y1);

  ctx.lineTo(shape.x2, shape.y2);

  ctx.stroke();
};
