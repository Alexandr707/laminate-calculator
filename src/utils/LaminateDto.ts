import { TileType } from '@/@types/SelectedType';

export class LaminateDto {
  private N = 0;
  constructor(private l: number, private w: number) {}

  getNew(): TileType {
    this.N++;
    return { l: this.l, w: this.w, n: this.N };
  }

  getNewWithLength(l: number): TileType {
    this.N++;
    return { l, w: this.w, n: this.N };
  }

  get platesCount() {
    return this.N;
  }
}
