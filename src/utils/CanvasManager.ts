export class CanvasManager {
  static defaultCanvas: HTMLCanvasElement | undefined;

  constructor() {
    throw new Error("CanvasManager is a static Class, cannot be instanced.");
  }

  static getDefaultCanvas() {
    this.defaultCanvas = this.defaultCanvas || document.createElement("canvas");

    return this.defaultCanvas;
  }

  static getNewCanvas() {
    return document.createElement("canvas");
  }

  toString() {
    return "[CanvasManager]";
  }
}
