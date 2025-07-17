export interface SlitherLinkBoardConfig {
  width: number;
  height: number;
}

export class SlitherLinkBoard {
  readonly width: number;
  readonly height: number;

  constructor(config: SlitherLinkBoardConfig) {
    this.width = config.width;
    this.height = config.height;
  }
}