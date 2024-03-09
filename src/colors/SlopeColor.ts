import { ColorGeom } from "../utils/ColorGeom";
import { AbstractColor } from "./AbstractColor";

export class SlopeColor extends AbstractColor {
  public static BRIGHTNESS_GAIN: number = -20;

  constructor(
    border: number = 0x949698,
    borderHighlight: number = 0xffffff,
    left: number = 0xc9cfd0,
    right: number = 0xe6e8e9,
    leftSlope: number = 0xdbdbdb,
    rightSlope: number = 0xdbdbdb,
  ) {
    super();
    this.border = ColorGeom.get32(border === undefined ? 0x949698 : border);

    this.borderHighlight = ColorGeom.get32(
      borderHighlight === undefined ? 0xffffff : borderHighlight,
    );

    this.left = ColorGeom.get32(left === undefined ? 0xc9cfd0 : left);
    this.right = ColorGeom.get32(right === undefined ? 0xe6e8e9 : right);

    this.leftSlope = ColorGeom.get32(
      leftSlope === undefined ? 0xdbdbdb : leftSlope,
    );

    this.rightSlope = ColorGeom.get32(
      rightSlope === undefined ? 0xdbdbdb : rightSlope,
    );
  }

  /*
   * horizontal side doesn't actually exist in the Slope primitive
   * you can assign the same horizontal color as cube
   * so that you will be able to arrange the slope with cube
   */
  static getByHorizontalColor(horizontal: number): SlopeColor {
    return new SlopeColor(
      ColorGeom.applyBrightness(horizontal, this.BRIGHTNESS_GAIN * 4),
      //apply hightlight
      ColorGeom.applyBrightness(horizontal, 0, true),
      ColorGeom.applyBrightness(horizontal, this.BRIGHTNESS_GAIN * 2),
      ColorGeom.applyBrightness(horizontal, this.BRIGHTNESS_GAIN),
      ColorGeom.applyBrightness(horizontal, this.BRIGHTNESS_GAIN * 1.5),
      ColorGeom.applyBrightness(horizontal, this.BRIGHTNESS_GAIN * 0.5),
    );
  }

  toString(): string {
    return "[SlopeColor]";
  }
}
