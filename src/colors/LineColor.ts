import { ColorGeom } from "../utils/ColorGeom";
import { AbstractColor } from "./AbstractColor";

export class LineColor extends AbstractColor {
  constructor(border: number) {
    super();

    this.border = ColorGeom.get32(border === undefined ? 0x878787 : border);
  }

  toString() {
    return "[LineColor]";
  }
}
