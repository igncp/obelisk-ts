import type { AbstractColor } from "../colors/AbstractColor";
import { LineColor } from "../colors/LineColor";
import type { AbstractDimension } from "../dimensions/AbstractDimension";
import { LineYDimension } from "../dimensions/LineYDimension";
import { BitmapData } from "../display/BitmapData";
import { Matrix } from "../geom/Matrix";
import { AbstractPrimitive } from "./AbstractPrimitive";

export class LineY extends AbstractPrimitive {
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
    const xOffsetBorder = this.dimension.yAxis - 1;
    const yOffsetBorder = 0;
    const borderColor = this.color.border;

    //y axis
    for (let i = 0; i < this.dimension.yAxis; i += 1) {
      this.bitmapData.setPixel(
        xOffsetBorder - i,
        yOffsetBorder + Math.floor(i / 2),
        borderColor,
      );
    }
  }

  private initBitmapData() {
    this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas);
  }

  private initRectangle() {
    this.w = this.dimension.yAxis;
    this.h = this.dimension.yAxis / 2;

    // the matrix offset between the bitmap and the 3d pixel coordinate ZERO point
    this.matrix = new Matrix();
    this.matrix.tx = -this.dimension.yAxis + 2;
    this.matrix.ty = 0;
  }

  private initRender(
    dimension?: AbstractDimension,
    color?: AbstractColor,
    useDefaultCanvas?: boolean,
  ) {
    this.useDefaultCanvas = useDefaultCanvas || false;
    this.dimension = dimension === undefined ? new LineYDimension() : dimension;
    this.color = color === undefined ? new LineColor() : color;
  }

  private renderBitmapDataForCanvas() {
    this.bitmapData.context.putImageData(this.bitmapData.imageData, 0, 0);
    this.canvas = this.bitmapData.canvas;
  }

  public toString() {
    return "[LineY]";
  }
}
