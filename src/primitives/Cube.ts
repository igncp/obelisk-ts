import type { AbstractColor } from "../colors/AbstractColor";
import { CubeColor } from "../colors/CubeColor";
import { SideColor } from "../colors/SideColor";
import type { AbstractDimension } from "../dimensions/AbstractDimension";
import { BrickDimension } from "../dimensions/BrickDimension";
import { CubeDimension } from "../dimensions/CubeDimension";
import { SideXDimension } from "../dimensions/SideXDimension";
import { SideYDimension } from "../dimensions/SideYDimension";
import { BitmapData } from "../display/BitmapData";
import { PixelObject } from "../display/PixelObject";
import { Matrix } from "../geom/Matrix";
import { AbstractPrimitive } from "./AbstractPrimitive";
import { Brick } from "./Brick";
import { SideX } from "./SideX";
import { SideY } from "./SideY";

export class Cube extends AbstractPrimitive {
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

    return this;
  }

  private build() {
    // horizontal layer
    const brick = new Brick(
      new BrickDimension(this.dimension.xAxis, this.dimension.yAxis),
      new SideColor(this.color.border, this.color.horizontal),
      this.border,
    );

    // left side
    const sideX = new SideX(
      new SideXDimension(this.dimension.xAxis, this.dimension.zAxis),
      new SideColor(this.color.border, this.color.left),
      this.border,
    );

    // right side
    const sideY = new SideY(
      new SideYDimension(this.dimension.yAxis, this.dimension.zAxis),
      new SideColor(this.color.border, this.color.right),
      this.border,
    );

    const poBrick = new PixelObject(brick);
    const poX = new PixelObject(sideX);
    const poY = new PixelObject(sideY);

    const ctx = this.bitmapData.context;

    ctx.drawImage(
      poBrick.canvas,
      poBrick.x + this.dimension.yAxis - 2,
      poBrick.y,
    );

    ctx.drawImage(
      poX.canvas,
      poX.x,
      poX.y + this.dimension.zAxis + this.dimension.yAxis / 2 - 1,
    );

    ctx.drawImage(
      poY.canvas,
      poY.x + this.w - 2,
      poX.y + this.dimension.zAxis + this.dimension.xAxis / 2 - 1,
    );

    // highlight & highlight fix
    const bmd = new BitmapData(this.w, this.h);

    if (this.border) {
      const offsetX = this.dimension.xAxis - 2;
      const offsetY = (this.dimension.xAxis + this.dimension.yAxis) / 2 - 2;

      //the 2px in bounding without hightlight
      for (let i = 0; i < this.dimension.xAxis - 2; i += 1) {
        bmd.setPixel(
          offsetX + 1 - i,
          offsetY - Math.floor(i / 2),
          this.color.borderHighlight,
        );
      }

      //the 2px in bounding without hightlight
      for (let j = 0; j < this.dimension.yAxis - 2; j += 1) {
        bmd.setPixel(
          offsetX + j,
          offsetY - Math.floor(j / 2),
          this.color.borderHighlight,
        );
      }

      for (let k = 0; k < this.dimension.zAxis; k += 1) {
        bmd.setPixel(offsetX, offsetY + k, this.color.borderHighlight);
      }
    } else {
      for (let i = 0; i < this.dimension.zAxis; i += 1) {
        bmd.setPixel(
          this.dimension.xAxis - 2,
          (this.dimension.xAxis + this.dimension.yAxis) / 2 - 1 + i,
          this.color.left,
        );
      }
    }

    bmd.context.putImageData(bmd.imageData, 0, 0);
    ctx.drawImage(bmd.canvas, 0, 0);
  }

  private initBitmapData() {
    this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas);
  }

  private initRectangle() {
    this.w = this.dimension.xAxis + this.dimension.yAxis;

    this.h =
      this.dimension.zAxis + (this.dimension.xAxis + this.dimension.yAxis) / 2;

    // 22.6 degrees implementation
    this.w -= 2;
    this.h -= 1;

    // the matrix offset between the bitmap and the 3d pixel coordinate ZERO point
    this.matrix = new Matrix();
    this.matrix.tx = -this.dimension.yAxis + 2;
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
    this.dimension = dimension === undefined ? new CubeDimension() : dimension;
    this.color = color === undefined ? new CubeColor() : color;
  }

  private renderBitmapDataForCanvas() {
    this.canvas = this.bitmapData.canvas;
  }

  toString() {
    return "[Cube]";
  }
}
