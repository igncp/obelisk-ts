import { Point } from "../geom/Point";
import type { Point3D } from "../geom/Point3D";
import type { Primitive } from "./PixelObject";
import { PixelObject } from "./PixelObject";

export class PixelView {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  point: Point;

  constructor(canvas: HTMLCanvasElement, point?: Point) {
    if (!canvas) {
      throw new Error("Canvas is not defined");
    }

    this.canvas = canvas;

    this.context = this.canvas.getContext("2d")!;
    this.context.imageSmoothingEnabled = false;

    this.point = point || new Point(0, 0);
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderObject(primitive: Primitive, point3D: Point3D) {
    const po = new PixelObject(primitive, point3D);

    this.context.drawImage(po.canvas, this.point.x + po.x, this.point.y + po.y);
  }

  toString() {
    return "[PixelView]";
  }
}
