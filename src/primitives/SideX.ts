import type { AbstractColor } from "../colors/AbstractColor";
import { SideColor } from "../colors/SideColor";
import type { AbstractDimension } from "../dimensions/AbstractDimension";
import { SideXDimension } from "../dimensions/SideXDimension";
import { BitmapData } from "../display/BitmapData";
import { Matrix } from "../geom/Matrix";
import { AbstractPrimitive } from "./AbstractPrimitive";

export class SideX extends AbstractPrimitive {
  constructor(
    dimension?: AbstractDimension,
    color?: AbstractColor,
    border?: boolean,
    useDefaultCanvas?: boolean,
  ) {
    super();
    this.initRender(dimension, color, border, useDefaultCanvas);
    this.initRectangle();
    this.initBitmapData();
    this.build();
    this.renderBitmapDataForCanvas();
  }

  private build() {
    const xOffsetInner = 0;
    const yOffsetInner = this.dimension.zAxis;
    const xOffsetOut = this.dimension.xAxis - 1;
    const yOffsetOut = this.h - this.dimension.zAxis - 1;
    const borderColor = this.border ? this.color.border : this.color.inner;

    //x axis
    for (let i = 0; i < this.dimension.xAxis; i += 1) {
      this.bitmapData.setPixel(
        xOffsetInner + i,
        yOffsetInner + Math.floor(i / 2),
        borderColor,
      );

      this.bitmapData.setPixel(
        xOffsetOut - i,
        yOffsetOut - Math.floor(i / 2),
        borderColor,
      );
    }

    //z axis
    for (let j = 0; j < this.dimension.zAxis; j += 1) {
      this.bitmapData.setPixel(xOffsetInner, yOffsetInner - j, borderColor);
      this.bitmapData.setPixel(xOffsetOut, yOffsetOut + j, borderColor);
    }

    //fill an pixel graphic enclosed
    this.bitmapData.floodFill(
      Math.floor(this.w / 2),
      Math.floor(this.h / 2),
      this.color.inner,
    );
  }

  private initBitmapData() {
    this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas);
  }

  private initRectangle() {
    this.w = this.dimension.xAxis;
    this.h = this.dimension.zAxis + this.dimension.xAxis / 2;

    // the matrix offset between the bitmap and the 3d pixel coordinate ZERO point
    this.matrix = new Matrix();
    this.matrix.tx = 0;
    this.matrix.ty = -this.dimension.zAxis;
  }

  private initRender(
    dimension?: AbstractDimension,
    color?: AbstractColor,
    border?: boolean,
    useDefaultCanvas?: boolean,
  ) {
    this.useDefaultCanvas = useDefaultCanvas || false;
    this.border = border || border === undefined;
    this.dimension = dimension === undefined ? new SideXDimension() : dimension;
    this.color = color === undefined ? new SideColor() : color;
  }

  private renderBitmapDataForCanvas() {
    this.bitmapData.context.putImageData(this.bitmapData.imageData, 0, 0);
    this.canvas = this.bitmapData.canvas;
  }

  toString() {
    return "[SideX]";
  }
}
