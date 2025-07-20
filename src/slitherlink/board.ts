export interface SlitherlinkBoardConfig {
  width: number;
  height: number;
}

export interface CellConfig {
  x: number;
  y: number;
}

export type EdgeTuple = [top: number, right: number, bottom: number, left: number];

export class SlitherlinkBoard {
  readonly width: number;
  readonly height: number;
  readonly matrixWidth: number;
  readonly matrixHeight: number;

  private matrix: number[][];

  constructor(config: SlitherlinkBoardConfig) {
    if (config.width === undefined || config.height === undefined ) {
      throw new Error("Board dimensions must be passed in config object.");
    } else if (config.width <= 0 || config.height <= 0) {
      throw new Error("Board dimensions must be greater than 0.");
    }
    this.width = config.width; 
    this.height = config.height;
    this.matrixWidth = config.width * 2 + 1;
    this.matrixHeight = config.height * 2 + 1;

    this.matrix = [];
    for (let row = 0; row < this.matrixHeight; row++) {
      this.matrix[row] = Array(this.matrixWidth).fill(-1);
    }
  }

  /**
   * Sets the clue value for the cell at (x, y)
   * @param x - The x coordinate of the cell
   * @param y - The y coordinate of the cell
   * @param clue - The clue value (0-3), or -1 for no clue.
   */
  setClue(x: number, y: number, clue: number): void {
    this.validateCellAccess(x, y);
    this.matrix[y * 2 + 1][x * 2 + 1] = clue;
  }

  /**
   * Gets the clue value for the cell at (x, y)
   * @param x - The x coordinate of the cell
   * @param y - The y coordinate of the cell
   * @returns The clue value (0-3), or -1 if no clue is set.
   */
  getClue(x: number, y: number): number {
    this.validateCellAccess(x, y);
    return this.matrix[y * 2 + 1][x * 2 + 1];
  }

  /**
   * Gets the edge values for the cell at (x, y).
   * @param x - The x coordinate of the cell
   * @param y - The y coordinate of the cell
   * @returns A 4-tuple of edge values
   */
  getEdges(x: number, y: number): EdgeTuple {
    this.validateCellAccess(x, y);
    const middleX = x * 2 + 1;
    const middleY = y * 2 + 1;
    const top = this.matrix[middleY - 1][middleX];
    const right = this.matrix[middleY][middleX + 1];
    const bottom = this.matrix[middleY + 1][middleX];
    const left = this.matrix[middleY][middleX - 1];
    return [top, right, bottom, left];
  }

  /**
   * Sets the edge values for the cell at (x, y).
   * @param x - The x coordinate of the cell
   * @param y - The y coordinate of the cell
   * @param edges A 4-tuple of edge values: [top, right, bottom, left]
   */
  setEdges(x: number, y: number, edges: EdgeTuple): void {
    this.validateCellAccess(x, y);
    const middleX = x * 2 + 1;
    const middleY = y * 2 + 1;
    this.matrix[middleY - 1][middleX] = edges[0];
    this.matrix[middleY][middleX + 1] = edges[1];
    this.matrix[middleY + 1][middleX] = edges[2];
    this.matrix[middleY][middleX - 1] = edges[3];
  }

  private validateCellAccess(x: number, y: number): void {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      throw new Error("Cell coordinates out of range.");
    }
  }
}