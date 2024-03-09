export class AbstractDimension {
  /**
   * Pyramid tall mode
   */
  tall: boolean = false;

  /**
   * The x Axis dimensions in 22.6 degrees coordinate
   */
  xAxis: number = null;

  /**
   * The y Axis dimensions in 22.6 degrees coordinate
   */
  yAxis: number = null;

  /**
   * The z Axis dimensions in 22.6 degrees coordinate
   */
  zAxis: number = null;

  toString() {
    return "[AbstractDimension]";
  }
}
