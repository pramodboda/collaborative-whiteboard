import type { Stroke } from "../types/drawing";
import { createSmoothStroke, getSvgPathFromStroke } from "./smoothStroke";

export const drawStroke = (ctx: CanvasRenderingContext2D, stroke: Stroke) => {
  const points = stroke.points.map((p) => [p.x, p.y]);

  const smoothStroke = createSmoothStroke(points);

  const pathData = getSvgPathFromStroke(smoothStroke);

  const path = new Path2D(pathData);

  ctx.fillStyle = stroke.color;

  ctx.fill(path);
};
