import { ColorGeom } from "../utils/ColorGeom";
import { AbstractColor } from "./AbstractColor";

export class CubeColor extends AbstractColor {
  public static BRIGHTNESS_GAIN: number = -20;

  constructor(
    public border: number = 0x878787,
    public borderHighlight: number = 0xffffff,
    public left: number = 0xc9cfd0,
    public right: number = 0xe3e3e3,
    public horizontal: number = 0xeeeff0,
  ) {
    super();

    this.border = ColorGeom.get32(border === undefined ? 0x878787 : border);

    this.borderHighlight = ColorGeom.get32(
      borderHighlight === undefined ? 0xffffff : borderHighlight,
    );

    this.left = ColorGeom.get32(left === undefined ? 0xc9cfd0 : left);
    this.right = ColorGeom.get32(right === undefined ? 0xe3e3e3 : right);

    this.horizontal = ColorGeom.get32(
      horizontal === undefined ? 0xeeeff0 : horizontal,
    );
  }

  public static getByHorizontalColor(horizontal: number): CubeColor {
    return new CubeColor(
      ColorGeom.applyBrightness(horizontal, CubeColor.BRIGHTNESS_GAIN * 4),
      ColorGeom.applyBrightness(horizontal, 0, true),
      ColorGeom.applyBrightness(horizontal, this.BRIGHTNESS_GAIN * 2),
      ColorGeom.applyBrightness(horizontal, this.BRIGHTNESS_GAIN),
      horizontal,
    );
  }

  toString(): string {
    return "[CubeColor]";
  }
}
