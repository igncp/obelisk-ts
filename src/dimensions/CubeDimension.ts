import { AbstractDimension } from "./AbstractDimension";

export class CubeDimension extends AbstractDimension {
  constructor(xAxis?: number, yAxis?: number, zAxis?: number) {
    super();

    this.xAxis = xAxis || 30;
    this.yAxis = yAxis || 30;
    this.zAxis = zAxis || 30;

    if (this.xAxis % 2 === 1 || this.yAxis % 2 === 1) {
      throw new Error("x,yAxis must be even number");
    }

    // xAxis || yAxis = 4 floodFill could not be applied
    if (this.xAxis <= 4 || this.yAxis <= 4 || this.zAxis <= 2) {
      throw new Error("dimension is too small");
    }
  }

  toString() {
    return "[CubeDimension]";
  }
}
