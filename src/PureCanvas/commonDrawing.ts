export interface Coordinate {
  x: number;
  y: number;
}

export interface DrawOptions {
  scale?: number;
  offset?: number;
  fillStyle?: string;
  location: Coordinate;
}
export function drawPath2D(ctx: CanvasRenderingContext2D, paths2D: Path2D[], options: DrawOptions, ): void {
  if (options.fillStyle !== undefined) {
    ctx.fillStyle = options.fillStyle;
  }
  ctx.save()
  if (options.scale !== undefined) {
    ctx.scale(options.scale, options.scale);
  }
  const scale = options.scale ?? 1;
  const offset = options.offset ?? 0;
  ctx.translate(options.location.x / scale - offset, options.location.y / scale - offset)
  paths2D.forEach(path => {
    ctx.fill(path);
  });
  ctx.restore()
}