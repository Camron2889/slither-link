export interface SlitherlinkBoardConfig {
  width: number;
  height: number;
}

export class SlitherlinkBoard {
  readonly width: number;
  readonly height: number;

  constructor(config: SlitherlinkBoardConfig) {
    this.width = config.width;
    this.height = config.height;
  }
}