export class AbstractColor {
  /**
   * The border colors for elements of certain primitive
   */
  border!: number;

  /**
   * The borderHighlight colors for elements of certain primitive
   */
  borderHighlight!: number;

  /**
   * The horizontal colors for elements of certain primitive
   */
  horizontal!: number;

  /**
   * The inner colors for elements of certain primitive
   */
  inner!: number;

  /**
   * The left side colors for elements of certain primitive
   */
  left!: number;

  /**
   * The left slot side colors for elements of certain primitive
   */
  leftSlope!: number;

  /**
   * The right side colors for elements of certain primitive
   */
  right!: number;

  /**
   * The right slot side colors for elements of certain primitive
   */
  rightSlope!: number;

  toString() {
    return "[AbstractColor]";
  }
}
