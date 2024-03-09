export class AbstractColor {
  /**
   * The border colors for elements of certain primitive
   */
  border: number = null;

  /**
   * The borderHighlight colors for elements of certain primitive
   */
  borderHighlight: number = null;

  /**
   * The horizontal colors for elements of certain primitive
   */
  horizontal: number = null;

  /**
   * The inner colors for elements of certain primitive
   */
  inner: number = null;

  /**
   * The left side colors for elements of certain primitive
   */
  left: number = null;

  /**
   * The left slot side colors for elements of certain primitive
   */
  leftSlope: number = null;

  /**
   * The right side colors for elements of certain primitive
   */
  right: number = null;

  /**
   * The right slot side colors for elements of certain primitive
   */
  rightSlope: number = null;

  toString() {
    return "[AbstractColor]";
  }
}
