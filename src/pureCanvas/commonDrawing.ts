export interface Coordinate {
  x: number;
  y: number;
}

export interface DrawOptions {
  scale?: number;
  offset?: number;
  fillStyle?: string;
  stroke?: string;
  strokeStyle?: string;
  lineWidth?: number;
  location: Coordinate;
}
export function drawPath2D(
  ctx: CanvasRenderingContext2D,
  paths2D: Path2D[],
  options: DrawOptions,
  isFilled: boolean = true
): void {
  ctx.save();
  if (options.fillStyle !== undefined) {
    ctx.fillStyle = options.fillStyle;
  }
  if (options.lineWidth !== undefined) {
    ctx.lineWidth = options.lineWidth;
  }
  if (options.strokeStyle !== undefined) {
    ctx.strokeStyle = options.strokeStyle;
  }
  if (options.scale !== undefined) {
    ctx.scale(options.scale, options.scale);
  }
  const scale = options.scale ?? 1;
  const offset = options.offset ?? 0;
  ctx.translate(
    options.location.x / scale - offset,
    options.location.y / scale - offset
  );
  paths2D.forEach((path) => {
    if (isFilled) {
      ctx.fill(path);
    } else {
      ctx.stroke(path);
    }
  });
  ctx.restore();
}

export function clearRectangle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  drawRectangleInstead?: boolean
): void {
  ctx.clearRect(x, y, w, h);
  if (drawRectangleInstead) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.stroke();
  } else {
    
  }
}
