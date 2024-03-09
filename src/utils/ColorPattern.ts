export class ColorPattern {
  static BLACK = 0x666666;
  static BLUE = 0x00ccff;

  static FINE_COLORS: number[] = [];

  static GRASS_GREEN = 0xccff00;
  static GRAY = 0xeeeeee;
  static PINK = 0xff7cbf;
  static PURPLE = 0xcc00ff;
  static WINE_RED = 0xff0099;

  static YELLOW = 0xffff00;

  constructor() {
    throw new Error("ColorPattern is a static Class, cannot be instanced.");
  }

  static getRandomComfortableColor() {
    return this.FINE_COLORS[
      Math.floor(Math.random() * this.FINE_COLORS.length)
    ];
  }
}

ColorPattern.FINE_COLORS.push(
  ColorPattern.GRASS_GREEN,
  ColorPattern.YELLOW,
  ColorPattern.WINE_RED,
  ColorPattern.PINK,
  ColorPattern.PURPLE,
  ColorPattern.BLUE,
  ColorPattern.GRAY,
  ColorPattern.BLACK,
);
