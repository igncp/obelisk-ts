import type { AbstractColor } from "../colors/AbstractColor";
import { LineColor } from "../colors/LineColor";
import type { AbstractDimension } from "../dimensions/AbstractDimension";
import { LineZDimension } from "../dimensions/LineZDimension";
import { BitmapData } from "../display/BitmapData";
import { Matrix } from "../geom/Matrix";
import { AbstractPrimitive } from "./AbstractPrimitive";

export class LineZ extends AbstractPrimitive {
  constructor(
    dimension?: AbstractDimension,
    color?: AbstractColor,
    useDefaultCanvas?: boolean,
  ) {
    super();
    this.initRender(dimension, color, useDefaultCanvas);
    this.initRectangle();
    this.initBitmapData();
    this.build();
    this.renderBitmapDataForCanvas();
  }

  private build() {
    const xOffsetBorder = 0;
    const yOffsetBorder = 0;
    const borderColor = this.color.border;

    //y axis
    for (let i = 0; i < this.dimension.zAxis; i += 1) {
      this.bitmapData.setPixel(xOffsetBorder, yOffsetBorder + i, borderColor);
    }
  }

  private initBitmapData() {
    this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas);
  }

  private initRectangle() {
    this.w = 1;
    this.h = this.dimension.zAxis;

    // the matrix offset between the bitmap and the 3d pixel coordinate ZERO point
    this.matrix = new Matrix();
    this.matrix.tx = 0;
    this.matrix.ty = -this.dimension.zAxis + 1;
  }

  private initRender(
    dimension?: AbstractDimension,
    color?: AbstractColor,
    useDefaultCanvas?: boolean,
  ) {
    this.useDefaultCanvas = useDefaultCanvas || false;
    this.dimension = dimension === undefined ? new LineZDimension() : dimension;
    this.color = color === undefined ? new LineColor() : color;
  }

  private renderBitmapDataForCanvas() {
    this.bitmapData.context.putImageData(this.bitmapData.imageData, 0, 0);
    this.canvas = this.bitmapData.canvas;
  }

  toString() {
    return "[LineZ]";
  }
}
