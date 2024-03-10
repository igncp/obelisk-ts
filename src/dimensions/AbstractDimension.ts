export abstract class AbstractDimension {
  /**
   * Pyramid tall mode
   */
  tall!: boolean;

  /**
   * The x Axis dimensions in 22.6 degrees coordinate
   */
  xAxis!: number;

  /**
   * The y Axis dimensions in 22.6 degrees coordinate
   */
  yAxis!: number;

  /**
   * The z Axis dimensions in 22.6 degrees coordinate
   */
  zAxis!: number;

  toString() {
    return "[AbstractDimension]";
  }
}
