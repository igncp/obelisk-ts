import type { AbstractColor } from "../colors/AbstractColor";
import { SideColor } from "../colors/SideColor";
import { SlopeColor } from "../colors/SlopeColor";
import type { AbstractDimension } from "../dimensions/AbstractDimension";
import { SideYDimension } from "../dimensions/SideYDimension";
import { SlopeDimension } from "../dimensions/SlopeDimension";
import { BitmapData } from "../display/BitmapData";
import { PixelObject } from "../display/PixelObject";
import { Matrix } from "../geom/Matrix";
import { AbstractPrimitive } from "./AbstractPrimitive";
import { SideY } from "./SideY";

export class SlopeWest extends AbstractPrimitive {
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

    const sideY = new SideY(
      new SideYDimension(
        this.dimension.yAxis,
        this.h - this.dimension.yAxis / 2,
      ),
      new SideColor(colorBorderRight, this.color.right),
    );

    const poY = new PixelObject(sideY);

    const ctx = this.bitmapData.context;

    ctx.drawImage(
      poY.canvas,
      poY.x + this.w - 2,
      poY.y + this.h - this.dimension.yAxis / 2,
    );

    const bmd = new BitmapData(this.w, this.h);

    // close the path for floodfill
    for (
      let i = this.h - (this.dimension.xAxis * 3) / 2 + 2;
      i < this.h;
      i += 1
    ) {
      bmd.setPixel(this.dimension.xAxis - 2, i, colorBorderLeft);
    }

    //x axis
    for (let j = 0; j < this.dimension.xAxis - 1; j += 1) {
      bmd.setPixel(
        j,
        this.dimension.xAxis + this.dimension.yAxis / 2 - 3 + Math.floor(j / 2),
        colorBorderLeft,
      );

      bmd.setPixel(
        j,
        this.dimension.xAxis + this.dimension.yAxis / 2 - 3 - j,
        colorBorderLeft,
      );
    }

    // flood fill
    bmd.floodFill(this.dimension.xAxis - 3, this.h - 3, this.color.left);

    //highlight
    for (let n = this.dimension.yAxis / 2; n < this.h - 1; n += 1) {
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
    this.h = (this.dimension.xAxis * 3) / 2 + this.dimension.yAxis / 2;

    // 22.6 degrees implementation
    this.w -= 2;
    this.h -= 3;

    // the matrix offset between the bitmap and the 3d pixel coordinate ZERO point
    this.matrix = new Matrix();
    this.matrix.tx = -(this.dimension.yAxis - 2);
    this.matrix.ty = -(this.dimension.xAxis - 2);
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
    return "[SlopeWest]";
  }
}
