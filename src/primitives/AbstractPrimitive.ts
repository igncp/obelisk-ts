import type { AbstractColor } from "../colors/AbstractColor";
import type { AbstractDimension } from "../dimensions/AbstractDimension";
import type { BitmapData } from "../display/BitmapData";
import type { Matrix } from "../geom/Matrix";

export abstract class AbstractPrimitive {
  /**
   * the source bitmapdata contains pixel graphic
   */
  bitmapData!: BitmapData;

  /**
   * the border option of the primitive
   */
  border!: boolean;

  /**
   * the canvas for drawImage to any canvas
   */
  canvas!: HTMLCanvasElement;

  /**
   * the color obj of the primitive
   */
  color!: AbstractColor;

  /**
   * the dimension of primitive in 3d pixel coordinate
   */
  dimension!: AbstractDimension;

  /**
   * the height of the bitmap in 2d flash coordinate
   */
  h!: number;

  /**
   * the matrix offset between the bitmap and the 3d pixel coordinate ZERO point
   */
  matrix!: Matrix;

  /**
   * the preserve canvas option
   */
  useDefaultCanvas!: boolean;

  /**
   * the width of the bitmap in 2d flash coordinate
   */
  w!: number;

  toString() {
    return "[AbstractPrimitive]";
  }
}
