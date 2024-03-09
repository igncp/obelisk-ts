import type { AbstractColor } from "../colors/AbstractColor";
import { SideColor } from "../colors/SideColor";
import type { AbstractDimension } from "../dimensions/AbstractDimension";
import { BrickDimension } from "../dimensions/BrickDimension";
import { BitmapData } from "../display/BitmapData";
import { Matrix } from "../geom/Matrix";
import { AbstractPrimitive } from "./AbstractPrimitive";

export class Brick extends AbstractPrimitive {
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
    const xOffsetInner = this.dimension.yAxis - 2;
    const yOffsetInner = 0;
    const xOffsetOut = this.dimension.xAxis - 1;
    const yOffsetOut = this.h - 1;
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

    //y axis
    for (let j = 0; j < this.dimension.yAxis; j += 1) {
      this.bitmapData.setPixel(
        xOffsetInner + 1 - j,
        yOffsetInner + Math.floor(j / 2),
        borderColor,
      );

      this.bitmapData.setPixel(
        xOffsetOut - 1 + j,
        yOffsetOut - Math.floor(j / 2),
        borderColor,
      );
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
    this.w = this.dimension.xAxis + this.dimension.yAxis;
    this.h = (this.dimension.xAxis + this.dimension.yAxis) / 2;

    // 22.6 degrees implementation
    this.w -= 2;
    this.h -= 1;

    // the matrix offset between the bitmap and the 3d pixel coordinate ZERO point
    this.matrix = new Matrix();
    this.matrix.tx = -this.dimension.yAxis + 2;
    this.matrix.ty = 0;
  }

  private initRender(
    dimension?: AbstractDimension,
    color?: AbstractColor,
    border?: boolean,
    useDefaultCanvas?: boolean,
  ) {
    this.useDefaultCanvas = useDefaultCanvas || false;
    this.border = border || border === undefined;
    this.dimension = dimension === undefined ? new BrickDimension() : dimension;
    this.color = color === undefined ? new SideColor() : color;
  }

  private renderBitmapDataForCanvas() {
    this.bitmapData.context.putImageData(this.bitmapData.imageData, 0, 0);
    this.canvas = this.bitmapData.canvas;
  }

  toString() {
    return "[Brick]";
  }
}
