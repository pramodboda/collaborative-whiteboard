import { getStroke } from "perfect-freehand";

export const getSvgPathFromStroke = (stroke: number[][]) => {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];

      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);

      return acc;
    },
    ["M", ...stroke[0], "Q"] as any,
  );

  d.push("Z");

  return d.join(" ");
};

export const createSmoothStroke = (points: number[][]) => {
  return getStroke(points, {
    size: 8,
    thinning: 0.5,
    smoothing: 0.7,
    streamline: 0.5,
  });
};
