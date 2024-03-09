import { ColorGeom } from "../utils/ColorGeom";
import { AbstractColor } from "./AbstractColor";

export class SideColor extends AbstractColor {
  static BRIGHTNESS_GAIN: number = -20;

  constructor(border?: number, inner?: number) {
    super();
    this.border = ColorGeom.get32(border === undefined ? 0x878787 : border);
    this.inner = ColorGeom.get32(inner === undefined ? 0xeeeeee : inner);
  }

  static getByInnerColor(inner: number) {
    return new SideColor(
      ColorGeom.applyBrightness(inner, this.BRIGHTNESS_GAIN * 4),
      inner,
    );
  }

  toString() {
    return "[SideColor]";
  }
}
