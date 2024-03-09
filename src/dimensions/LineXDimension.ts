import { AbstractDimension } from "./AbstractDimension";

export class LineXDimension extends AbstractDimension {
  constructor(xAxis: number | undefined) {
    super();

    this.xAxis = xAxis || 30;

    if (this.xAxis % 2 === 1) {
      throw new Error("xAxis must be even number");
    }

    if (this.xAxis < 2) {
      throw new Error("dimension is too small");
    }
  }

  toString() {
    return "[LineXDimension]";
  }
}
