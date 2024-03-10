import type { AbstractColor } from "../colors/AbstractColor";
import { SideColor } from "../colors/SideColor";
import { SlopeColor } from "../colors/SlopeColor";
import type { AbstractDimension } from "../dimensions/AbstractDimension";
import { SideXDimension } from "../dimensions/SideXDimension";
import { SlopeDimension } from "../dimensions/SlopeDimension";
import { BitmapData } from "../display/BitmapData";
import { PixelObject } from "../display/PixelObject";
import { Matrix } from "../geom/Matrix";
import { AbstractPrimitive } from "./AbstractPrimitive";
import { SideX } from "./SideX";

export class SlopeNorth extends AbstractPrimitive {
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
    const colorBorderLeft = this.border ? this.color.border : this.color.left;
    const colorBorderRight = this.border ? this.color.border : this.color.right;

    const colorBorderHighlight = this.border
      ? this.color.borderHighlight
      : this.color.left;

    const sideX = new SideX(
      new SideXDimension(
        this.dimension.xAxis,
        this.h - this.dimension.xAxis / 2,
      ),
      new SideColor(colorBorderLeft, this.color.left),
    );

    const poX = new PixelObject(sideX);

    const ctx = this.bitmapData.context;

    ctx.drawImage(poX.canvas, poX.x, poX.y + this.h - this.dimension.xAxis / 2);

    const bmd = new BitmapData(this.w, this.h);

    // close the path for floodfill
    for (
      let i = this.h - (this.dimension.yAxis * 3) / 2 + 2;
      i < this.h;
      i += 1
    ) {
      bmd.setPixel(this.dimension.xAxis - 1, i, colorBorderRight);
    }

    // y axis
    for (let j = 1; j < this.dimension.yAxis; j += 1) {
      bmd.setPixel(
        this.dimension.xAxis + j - 2,
        this.h - Math.floor(j / 2) - 1,
        colorBorderRight,
      );

      bmd.setPixel(
        this.dimension.xAxis + j - 2,
        this.dimension.xAxis / 2 - 2 + j,
        colorBorderRight,
      );
    }

    // flood fill
    bmd.floodFill(this.dimension.xAxis + 1, this.h - 3, this.color.right);

    //highlight
    for (let n = this.dimension.xAxis / 2; n < this.h - 1; n += 1) {
      bmd.setPixel(this.dimension.xAxis - 1, n, this.color.right);
      bmd.setPixel(this.dimension.xAxis - 2, n, colorBorderHighlight);
    }

    bmd.context.putImageData(bmd.imageData, 0, 0);
    ctx.drawImage(bmd.canvas, 0, 0);
  }

  private initBitmapData() {
    this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas);
  }

  private initRectangle() {
    this.w = this.dimension.xAxis + this.dimension.yAxis;
    this.h = (this.dimension.yAxis * 3) / 2 + this.dimension.xAxis / 2;

    // 22.6 degrees implementation
    this.w -= 2;
    this.h -= 3;

    // the matrix offset between the bitmap and the 3d pixel coordinate ZERO point
    this.matrix = new Matrix();
    this.matrix.tx = -(this.dimension.yAxis - 2);
    this.matrix.ty = -(this.dimension.yAxis - 2);
  }

  private initRender(
    dimension?: AbstractDimension,
    color?: AbstractColor,
    border?: boolean,
    useDefaultCanvas?: boolean,
  ) {
    this.useDefaultCanvas = useDefaultCanvas || false;
    this.border = border || border === undefined;
    this.dimension = dimension === undefined ? new SlopeDimension() : dimension;
    this.color = color === undefined ? new SlopeColor() : color;
  }

  private renderBitmapDataForCanvas() {
    this.canvas = this.bitmapData.canvas;
  }

  toString() {
    return "[SlopeNorth]";
  }
}
