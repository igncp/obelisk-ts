import { AbstractDimension } from "./AbstractDimension";

export class SideXDimension extends AbstractDimension {
  constructor(xAxis: number | undefined, zAxis: number | undefined) {
    super();
    this.xAxis = xAxis || 30;
    this.zAxis = zAxis || 30;

    if (this.xAxis % 2 === 1) {
      throw new Error("xAxis must be even number");
    }

    // xAxis || zAxis = 4 floodFill could not be applied
    if (this.xAxis <= 4 || this.zAxis <= 2) {
      throw new Error("dimension is too small");
    }
  }

  toString() {
    return "[SideXDimension]";
  }
}
