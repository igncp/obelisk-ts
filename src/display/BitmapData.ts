import { CanvasManager } from "../utils/CanvasManager";

export class BitmapData {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  imageData: ImageData;

  constructor(w: number, h: number, useDefaultCanvas?: boolean) {
    if (w === undefined || h === undefined) {
      throw new Error("BitmapData width or height is missing");
    }

    if (useDefaultCanvas) {
      this.canvas = CanvasManager.getDefaultCanvas();
    } else {
      this.canvas = CanvasManager.getNewCanvas();
    }

    this.canvas.setAttribute("width", w.toString());
    this.canvas.setAttribute("height", h.toString());

    this.context = this.canvas.getContext("2d")!;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.imageSmoothingEnabled = false;

    this.imageData = this.context.createImageData(w, h);
  }

  checkPixelAvailable(x: number, y: number) {
    const index = (y * this.imageData.width + x) * 4;

    return this.imageData.data[index + 3] === 0;
  }

  floodFill(posX: number, posY: number, color: number) {
    if (((color >>> 24) & 0xff) === 0x00) {
      // transparent flood fill
      return;
    }

    let x = posX,
      y = posY,
      nowCol = [],
      prevCol: number[] = [],
      col,
      row,
      matchFlag,
      newStart,
      i,
      j;

    const w = this.imageData.width;
    const h = this.imageData.height;

    const stack = [];

    // bound reach
    if (x < 0 || y < 0 || x >= w || y >= h) {
      return;
    }

    // first point check fail
    if (!this.checkPixelAvailable(x, y)) {
      throw new Error("Start point for flood fill is already filled");
    }

    // left side flood fill
    for (col = x; col >= 0; col -= 1) {
      // top side
      for (row = y; row >= 0; row -= 1) {
        if (this.checkPixelAvailable(col, row)) {
          // available pixel
          stack.push((row * w + col) * 4);
          nowCol.push(row);
        } else {
          // first one is invalid pixel && not at col top
          if (row === y && this.checkPixelAvailable(col + 1, row - 1)) {
            // next one is valid
            if (this.checkPixelAvailable(col, row - 1)) {
              newStart = row - 1;
            } else {
              if (this.checkPixelAvailable(col + 1, row - 2)) {
                newStart = row - 2;
              } else {
                // fail, assign max value to avoid loop below
                newStart = -1;
              }
            }

            for (row = newStart; row >= 0; row -= 1) {
              if (this.checkPixelAvailable(col, row)) {
                // available pixel
                stack.push((row * w + col) * 4);
                nowCol.push(row);
              } else {
                break;
              }
            }
          }

          break;
        }
      }

      // bottom side
      for (row = y; row < h; row += 1) {
        if (this.checkPixelAvailable(col, row)) {
          // available pixel
          stack.push((row * w + col) * 4);
          nowCol.push(row);
        } else {
          // first one is invalid pixel && not at col bottom
          if (row === y && this.checkPixelAvailable(col + 1, row + 1)) {
            // next one is valid
            if (this.checkPixelAvailable(col, row + 1)) {
              newStart = row + 1;
            } else {
              if (this.checkPixelAvailable(col + 1, row + 2)) {
                newStart = row + 2;
              } else {
                // fail, assign max value to avoid loop below
                newStart = h;
              }
            }

            for (row = newStart; row < h; row += 1) {
              if (this.checkPixelAvailable(col, row)) {
                // available pixel
                stack.push((row * w + col) * 4);
                nowCol.push(row);
              } else {
                break;
              }
            }
          }

          break;
        }
      }

      // compare with previous column
      // for first column
      // the given point should be inside the container
      if (col === x) {
        prevCol = nowCol.concat();
      }

      matchFlag = false;

      for (i = 0; i < prevCol.length; i += 1) {
        for (j = 0; j < prevCol.length; j += 1) {
          if (nowCol[j] === prevCol[i]) {
            matchFlag = true;
            y = prevCol[i];
            break;
          }
        }

        if (matchFlag) {
          break;
        }
      }

      if (matchFlag) {
        prevCol = nowCol.concat();
        nowCol = [];
      } else {
        // bound reach
        break;
      }
    }

    // reset start point
    x = posX;
    y = posY;
    prevCol = [];
    nowCol = [];

    // right side flood fill
    for (col = x; col < w; col += 1) {
      // top side
      for (row = y; row >= 0; row -= 1) {
        if (this.checkPixelAvailable(col, row)) {
          // available pixel
          stack.push((row * w + col) * 4);
          nowCol.push(row);
        } else {
          // first one is invalid pixel && not at col top
          if (row === y && this.checkPixelAvailable(col - 1, row - 1)) {
            // next one is valid
            if (this.checkPixelAvailable(col, row - 1)) {
              newStart = row - 1;
            } else {
              if (this.checkPixelAvailable(col - 1, row - 2)) {
                newStart = row - 2;
              } else {
                // fail, assign max value to avoid loop below
                newStart = -1;
              }
            }

            for (row = newStart; row >= 0; row -= 1) {
              if (this.checkPixelAvailable(col, row)) {
                // available pixel
                stack.push((row * w + col) * 4);
                nowCol.push(row);
              } else {
                break;
              }
            }
          }

          break;
        }
      }

      // bottom side
      for (row = y; row < h; row += 1) {
        if (this.checkPixelAvailable(col, row)) {
          // available pixel
          stack.push((row * w + col) * 4);
          nowCol.push(row);
        } else {
          // first one is invalid pixel && not at col bottom
          if (row === y && this.checkPixelAvailable(col - 1, row + 1)) {
            // next one is valid
            if (this.checkPixelAvailable(col, row + 1)) {
              newStart = row + 1;
            } else {
              if (this.checkPixelAvailable(col - 1, row + 2)) {
                newStart = row + 2;
              } else {
                // fail, assign max value to avoid loop below
                newStart = h;
              }
            }

            for (row = newStart; row < h; row += 1) {
              if (this.checkPixelAvailable(col, row)) {
                // available pixel
                stack.push((row * w + col) * 4);
                nowCol.push(row);
              } else {
                break;
              }
            }
          }

          break;
        }
      }

      // compare with previous column
      // for first column
      // the given point should be inside the container
      if (col === x) {
        prevCol = nowCol.concat();
      }

      matchFlag = false;

      for (i = 0; i < prevCol.length; i += 1) {
        for (j = 0; j < prevCol.length; j += 1) {
          if (nowCol[j] === prevCol[i]) {
            matchFlag = true;
            y = prevCol[i];
            break;
          }
        }

        if (matchFlag) {
          break;
        }
      }

      if (matchFlag) {
        prevCol = nowCol.concat();
        nowCol = [];
      } else {
        // bound reach
        break;
      }
    }

    // fill image data
    for (i = 0; i < stack.length; i += 1) {
      this.setPixelByIndex(stack[i], color);
    }
  }

  setPixel(posX: number, posY: number, color: number) {
    const index = (posY * this.imageData.width + posX) * 4;

    this.setPixelByIndex(index, color);
  }

  setPixelByIndex(index: number, color: number) {
    const pixels = this.imageData.data;

    pixels[index] = (color >>> 16) & 0xff;
    pixels[index + 1] = (color >>> 8) & 0xff;
    pixels[index + 2] = (color >>> 0) & 0xff;
    pixels[index + 3] = (color >>> 24) & 0xff;
  }

  toString() {
    return "[BitmapData]";
  }
}
