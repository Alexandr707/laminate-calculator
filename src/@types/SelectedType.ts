import { LaminateDirection } from './LaminateDirection';

export type TileType = {
  n: number;
  l: number;
  w: number;
};

export type RowType = {
  length: number;
  width: number;
  x: number;
  y: number;
  tiles?: TileType[];
};

export type SelectedType = {
  l_room: number;
  w_room: number;
  l_lam: number;
  w_lam: number;
  nPack: number;
  minOst: number;
  packArea: number;
  direction: LaminateDirection;
  ofsetType: number;
  rows: RowType[];
};
