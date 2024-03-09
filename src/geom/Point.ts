export class Point {
  x = 0;
  y = 0;

  constructor(x?: number, y?: number) {
    this.x = x === undefined ? 0 : x;
    this.y = y === undefined ? 0 : y;
  }

  toString() {
    return `[Point x : ${this.x}, y : ${this.y}]`;
  }
}
