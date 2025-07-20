export interface SlitherlinkBoardConfig {
  width: number;
  height: number;
}

export interface CellConfig {
  x: number;
  y: number;
}

export class Cell {
  constructor() {

  }
}

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
}