export function rotateFromCentralPoint(
  cx: number,
  cy: number,
  x: number,
  y: number,
  angle: number
): [number, number] {
  const radians = degreeToRadian(angle);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = cos * (x - cx) + sin * (y - cy) + cx;
  const ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
}

export function degreeToRadian(angle: number):number{
  return (Math.PI / 180) * angle;
}