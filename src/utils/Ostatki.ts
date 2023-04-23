import { TileType } from './../@types/SelectedType';
export class Ostatki {
  private ost: TileType[] = [];

  constructor() {}

  get(size: number) {
    if (!this.ost.length) return null;

    const temp = this.ost.filter(o => o.l >= size);
    if (!temp.length) return null;

    const min = temp.reduce((acc, cur) => (acc.l > cur.l ? cur : acc), temp[0]);

    this.ost = this.ost.filter(o => o !== min);

    return min;
  }

  push(tile: TileType) {
    this.ost.push(tile);
  }

  getAll() {
    return [...this.ost];
  }
}
