import { AbstractDimension } from "./AbstractDimension";

export class SlopeDimension extends AbstractDimension {
  constructor(xAxis?: number, yAxis?: number) {
    super();

    this.xAxis = xAxis || 30;
    this.yAxis = yAxis || 30;

    if (this.xAxis % 2 === 1 || this.yAxis % 2 === 1) {
      throw new Error("xAxis and yAxis must be even number");
    }

    if (this.xAxis <= 4 || this.yAxis <= 4) {
      throw new Error("dimension is too small");
    }
  }

  toString() {
    return "[SlopeDimension]";
  }
}
