import { AbstractDimension } from "./AbstractDimension";

export class PyramidDimension extends AbstractDimension {
  constructor(axis?: number, tall?: boolean) {
    super();

    this.xAxis = axis || 30;
    this.yAxis = axis || 30;
    this.tall = tall || false;

    if (this.xAxis % 2 === 1) {
      throw new Error("axis must be even number");
    }

    if (this.xAxis <= 4) {
      throw new Error("dimension is too small");
    }

    return this;
  }

  toString() {
    return "[PyramidDimension]";
  }
}
