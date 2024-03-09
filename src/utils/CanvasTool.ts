type ImageData = {
  data: Uint8ClampedArray;
  height: number;
  width: number;
};

export class CanvasTool {
  constructor() {
    throw new Error("CanvasTool is a static Class, cannot be instanced.");
  }

  static getPixel(imageData: ImageData, x: number, y: number) {
    const { data } = imageData;

    const index = (y * imageData.width + x) * 4;

    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];

    return (r << 16) | (g << 8) | b;
  }

  toString() {
    return "[CanvasTool]";
  }
}
