import { Point } from "./Point";

export class Point3D {
  x: number;
  y: number;
  z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toGlobalCoordinates(offset: Point) {
    const p2D = new Point(
      this.x - this.y,
      Math.floor(this.x / 2 + this.y / 2) - this.z,
    );

    if (offset !== undefined) {
      p2D.x = p2D.x + offset.x;
      p2D.y = p2D.y + offset.y;
    }

    return p2D;
  }

  toString() {
    return `[Point3D x : ${this.x}, y : ${this.y}, z: ${this.z}]`;
  }
}
