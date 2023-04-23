import { Rectangle } from './Rectangle';

export function getRowCount(
  l_room: number,
  w_room: number,
  w_lam: number,
  isDiagonal = false,
) {
  if (w_lam <= 0) return 0;

  if (isDiagonal) {
    return Math.ceil(Rectangle.getDiagonal(l_room, w_room) / w_lam);
  } else {
    return Math.ceil(w_room / w_lam);
  }
}
