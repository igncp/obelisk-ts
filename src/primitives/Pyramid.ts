import type { AbstractColor } from "../colors/AbstractColor";
import { PyramidColor } from "../colors/PyramidColor";
import type { AbstractDimension } from "../dimensions/AbstractDimension";
import { PyramidDimension } from "../dimensions/PyramidDimension";
import { BitmapData } from "../display/BitmapData";
import { Matrix } from "../geom/Matrix";
import { AbstractPrimitive } from "./AbstractPrimitive";

export class Pyramid extends AbstractPrimitive {
  hOffset: number = 0;
  hSize: number = 0;

  constructor(
    dimension?: AbstractDimension,
    color?: AbstractColor,
    border?: boolean,
    useDefaultCanvas?: boolean,
  ) {
    super();
    this.initRender(dimension, color, border, useDefaultCanvas);
    this.initRectangle();
    this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas);
    this.build();
    this.renderBitmapDataForCanvas();
  }

  build() {
    let i, j, k, l1, m1, l2, m2;

    const colorBorderLeft = this.border ? this.color.border : this.color.left;
    const colorBorderRight = this.border ? this.color.border : this.color.right;

    const colorBorderHighlight = this.border
      ? this.color.borderHighlight
      : colorBorderLeft;

    //z axis || hightlight
    for (k = 0; k < this.hSize + this.dimension.xAxis / 2 - 4; k += 1) {
      this.bitmapData.setPixel(
        this.dimension.xAxis - 2,
        k + 3 + this.hOffset,
        colorBorderHighlight,
      );
    }

    //x axis
    for (i = 0; i < this.dimension.xAxis; i += 1) {
      this.bitmapData.setPixel(
        i,
        this.hSize + Math.floor(i / 2) + this.hOffset,
        colorBorderLeft,
      );
    }

    //y axis
    for (j = 0; j < this.dimension.xAxis; j += 1) {
      this.bitmapData.setPixel(
        j + this.dimension.xAxis - 2,
        this.hSize +
          this.dimension.xAxis / 2 -
          Math.floor(j / 2) -
          1 +
          this.hOffset,
        colorBorderRight,
      );
    }

    if (!this.dimension.tall) {
      //left edge
      for (l1 = 0; l1 < this.hSize; l1 += 1) {
        this.bitmapData.setPixel(
          l1,
          this.hSize - l1 + this.hOffset,
          colorBorderLeft,
        );
      }

      //right edge
      for (m1 = 0; m1 < this.hSize; m1 += 1) {
        this.bitmapData.setPixel(
          m1 + this.hSize - 2,
          m1 + 1 + this.hOffset,
          colorBorderRight,
        );
      }
    } else {
      //left edge
      for (l2 = 0; l2 < this.hSize - 2; l2 += 1) {
        this.bitmapData.setPixel(
          Math.floor(l2 / 2),
          this.hSize - l2 + this.hOffset,
          colorBorderLeft,
        );
      }

      //right edge
      for (m2 = 2; m2 < this.hSize; m2 += 1) {
        this.bitmapData.setPixel(
          Math.floor(m2 / 2) + this.dimension.xAxis - 2,
          m2 + 1 + this.hOffset,
          colorBorderRight,
        );
      }
    }

    if (!this.border) {
      this.bitmapData.setPixel(
        this.dimension.xAxis - 2,
        this.hSize + this.dimension.xAxis / 2 - 1 + this.hOffset,
        colorBorderLeft,
      );
    }

    //floodfill
    this.bitmapData.floodFill(
      this.dimension.xAxis - 1,
      this.hSize +
        Math.floor((this.dimension.xAxis - 1) / 2) +
        this.hOffset -
        1,
      this.color.right,
    );

    this.bitmapData.floodFill(
      this.dimension.xAxis - 3,
      this.hSize +
        Math.floor((this.dimension.xAxis - 1) / 2) +
        this.hOffset -
        2,
      this.color.left,
    );
  }

  initRectangle() {
    this.w = this.dimension.xAxis + this.dimension.yAxis;
    this.h = this.hSize + this.dimension.xAxis / 2;

    // 22.6 degrees implementation
    this.w -= 2;
    this.h += this.hOffset;

    // the matrix offset between the bitmap and the 3d pixel coordinate ZERO point
    this.matrix = new Matrix();
    this.matrix.tx = -this.dimension.xAxis + 2;

    this.matrix.ty =
      -this.hSize / 2 +
      2 -
      (this.dimension.tall ? this.dimension.xAxis / 2 : 1);
  }

  initRender(
    dimension: PyramidDimension | undefined,
    color?: PyramidColor,
    border?: boolean,
    useDefaultCanvas?: boolean,
  ) {
    this.useDefaultCanvas = useDefaultCanvas || false;
    this.border = border || border === undefined;

    this.dimension =
      dimension === undefined ? new PyramidDimension() : dimension;

    this.color = color === undefined ? new PyramidColor() : color;

    this.hSize = this.dimension.tall
      ? this.dimension.xAxis * 2
      : this.dimension.xAxis;

    this.hOffset = this.dimension.tall ? -3 : -2;
  }

  renderBitmapDataForCanvas() {
    this.bitmapData.context.putImageData(this.bitmapData.imageData, 0, 0);
    this.canvas = this.bitmapData.canvas;
  }

  toString() {
    return "[Pyramid]";
  }
}
