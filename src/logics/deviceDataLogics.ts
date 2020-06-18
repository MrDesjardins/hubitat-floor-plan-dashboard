import { Coordinate } from "../models/devices";
export const isDeviceInBox = (
  x: number,
  y: number,
  coord: Coordinate | undefined
): boolean => {
  if (coord === undefined) {
    return false;
  }

  return x >= coord.x1 && x <= coord.x2 && y >= coord.y1 && y <= coord.y2;
};
