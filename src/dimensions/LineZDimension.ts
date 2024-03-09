import { AbstractDimension } from "./AbstractDimension";

export class LineZDimension extends AbstractDimension {
  zAxis: number;

  constructor(zAxis?: number) {
    super();

    this.zAxis = zAxis || 30;

    if (this.zAxis <= 0) {
      throw new Error("dimension is too small");
    }
  }

  toString() {
    return "[LineZDimension]";
  }
}
