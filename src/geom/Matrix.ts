export class Matrix {
  /**
   * Position (0, 0) in a 3x3 matrix.
   **/
  a = 1;

  /**
   * Position (0, 1) in a 3x3 matrix.
   **/
  b = 0;

  /**
   * Position (1, 0) in a 3x3 matrix.
   **/
  c = 0;

  /**
   * Position (1, 1) in a 3x3 matrix.
   **/
  d = 1;

  /**
   * Position (2, 0) in a 3x3 matrix.
   **/
  tx = 0;

  /**
   * Position (2, 1) in a 3x3 matrix.
   **/
  ty = 0;

  constructor(
    a?: number,
    b?: number,
    c?: number,
    d?: number,
    tx?: number,
    ty?: number,
  ) {
    this.a = a === undefined ? 1 : a;
    this.b = b || 0;
    this.c = c || 0;
    this.d = d === undefined ? 1 : d;
    this.tx = tx || 0;
    this.ty = ty || 0;
  }

  toString() {
    return "[Matrix]";
  }
}
