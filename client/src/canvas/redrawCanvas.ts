import type { BoardElement } from "../types/drawing";
import { drawStroke } from "./drawStroke";
import { drawCircle, drawLine, drawRectangle } from "./drawShape";

export const redrawCanvas = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  elements: BoardElement[],
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  elements.forEach((element) => {
    switch (element.type) {
      case "stroke":
        drawStroke(ctx, element);
        break;

      case "rectangle":
        drawRectangle(ctx, element);
        break;

      case "circle":
        drawCircle(ctx, element);
        break;

      case "line":
        drawLine(ctx, element);
        break;
    }
  });
};
