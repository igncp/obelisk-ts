import { Point3D } from "../geom/Point3D";

// @TODO
type Primitive = {
  canvas: any;
  matrix: any;
};

export class PixelObject {
  canvas: any;
  x: number;
  y: number;

  constructor(primitive: Primitive, point3D?: Point3D) {
    if (!primitive) {
      throw new Error("Primitive is not defined");
    }

    const p3D = point3D || new Point3D();

    this.canvas = primitive.canvas;
    this.x = primitive.matrix.tx + p3D.x - p3D.y;
    this.y = primitive.matrix.ty + Math.floor(p3D.x / 2 + p3D.y / 2) - p3D.z;
  }

  toString() {
    return "[PixelObject]";
  }
}
